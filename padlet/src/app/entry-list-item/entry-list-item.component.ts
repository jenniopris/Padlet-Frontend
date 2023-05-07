import {Component, Input} from '@angular/core';
import {EntryFactory} from "../shared/entry-factory";
import {Entry} from "../shared/entry";

@Component({
  selector: 'a.pd-entry-list-item',
  templateUrl: './entry-list-item.component.html',
  styles: []
})
export class EntryListItemComponent {
  @Input() entry: Entry = EntryFactory.empty();
}
