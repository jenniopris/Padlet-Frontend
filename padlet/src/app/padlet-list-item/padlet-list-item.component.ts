import {Component, Input} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {Entry} from "../shared/entry";
import {PadletFactory} from "../shared/padlet-factory";

@Component({
  selector: 'a.pd-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: [
  ]
})
export class PadletListItemComponent {
  @Input() padlet: Padlet = PadletFactory.empty();
}
