import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {PadletApiService} from "../shared/padlet-api.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'pd-entry-details',
  templateUrl: './entry-details.component.html',
  styles: [
  ]
})
export class EntryDetailsComponent implements OnInit {

  entry: Entry = EntryFactory.empty();
  buttonRouterLink: string = '';

  constructor(
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService,
    public authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.buttonRouterLink = '/padlets/' + params['padletId'];
    this.loadData(params['entryId']);
  }

  loadData(entryId: string) {
    this.ps.getEntryById(entryId).subscribe(res => this.entry = res);
  }

  editEntry() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteEntry() {
    if (confirm('Are you sure you want to delete this entry (' + this.entry.name + ')?')) {
      this.toastr.warning("Entry deleted");
      this.ps.deleteEntry(this.entry.id).subscribe(res => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
  }
}
