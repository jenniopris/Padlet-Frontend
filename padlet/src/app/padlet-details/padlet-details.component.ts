import {Component, OnInit} from '@angular/core';
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry, Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'pd-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entry[] = [];

  constructor(
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe(res => this.padlet = res);
    this.ps.getEntriesById(params['id']).subscribe(res => this.entries = res);
  }
}
