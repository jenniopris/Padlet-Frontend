import {Component, Input} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {Entry} from "../shared/entry";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletListComponent} from "../padlet-list/padlet-list.component";
import {PadletApiService} from "../shared/padlet-api.service";

@Component({
  selector: 'a.pd-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: []
})
export class PadletListItemComponent {

  @Input() padlet: Padlet = PadletFactory.empty();

  constructor(
    private padletApiService: PadletApiService,
    public padletListComponent: PadletListComponent
  ) {
  }

  onDeleteClick() {
    if(confirm("Delete " + this.padlet.name + "?" + "\n" + "This will delete all entries in this padlet.")){
      this.padletApiService.deletePadlet(this.padlet.id).subscribe(() => {
        this.padletListComponent.loadPadlets();
      });
    }
  }
}
