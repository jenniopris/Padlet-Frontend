import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'pd-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})
export class PadletDetailsComponent {

  @Input() padlet: Padlet = PadletFactory.empty();
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSingle(params['id']).subscribe((p: Padlet) => this.padlet = p);
  }
}
