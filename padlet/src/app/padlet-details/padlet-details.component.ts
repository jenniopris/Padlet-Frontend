import {Component, OnInit} from '@angular/core';
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry, Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'pd-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})
export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entry[] = [];
  isEditMode: boolean = false;

  constructor(
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe(res => this.padlet = res);
    this.loadEntries(params['id']);
  }

  loadEntries(padletId: string) {
    this.ps.getEntriesById(padletId).subscribe(res => this.entries = res);
  }

  deletePadlet() {
    if (confirm('Are you sure you want to delete this padlet (' + this.padlet.name + ')?')) {
      this.ps.deletePadlet(this.padlet.id).subscribe(res => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
  }

  onDeleteClick(id: number) {
    if (confirm('Delete ' + this.entries?.find(e => e.id === id)?.name  + '?' )) {
      this.ps.deleteEntry(id).subscribe(() => {
        this.loadEntries(this.padlet.id.toString());
      });
    }
  }
}
