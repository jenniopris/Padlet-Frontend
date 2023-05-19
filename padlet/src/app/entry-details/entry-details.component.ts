import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {PadletApiService} from "../shared/padlet-api.service";
import {ToastrService} from "ngx-toastr";

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
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.buttonRouterLink = '/padlets/' + params['padletId'];
    this.ps.getEntryById(params['entryId']).subscribe(res => this.entry = res);
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
