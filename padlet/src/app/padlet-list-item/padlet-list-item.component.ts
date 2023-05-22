import {Component, Input, OnInit} from '@angular/core';
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletListComponent} from "../padlet-list/padlet-list.component";
import {PadletApiService} from "../shared/padlet-api.service";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'a.pd-padlet-list-item',
  templateUrl: './padlet-list-item.component.html',
  styles: []
})
export class PadletListItemComponent {

  @Input() padlet: Padlet = PadletFactory.empty();

  constructor(
    private padletApiService: PadletApiService,
    public authService: AuthenticationService,
    public padletListComponent: PadletListComponent,
    public toastr: ToastrService
  ) {
  }

  onDeleteClick() {
    if(confirm("Delete " + this.padlet.name + "?" + "\n" + "This will delete all entries in this padlet.")){
      this.toastr.warning("Padlet deleted");
      this.padletApiService.deletePadlet(this.padlet.id).subscribe(() => {
        this.padletListComponent.loadPadlets();
      });
    }
  }
}
