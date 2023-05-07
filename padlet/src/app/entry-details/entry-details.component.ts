import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Entry} from "../shared/entry";
import {EntryFactory} from "../shared/entry-factory";
import {PadletApiService} from "../shared/padlet-api.service";

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
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.buttonRouterLink = '/padlets/' + params['padletId'];
    this.ps.getEntryById(params['entryId']).subscribe(res => this.entry = res);
  }
}
