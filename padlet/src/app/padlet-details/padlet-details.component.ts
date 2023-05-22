import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry, Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";
import {PadletFormComponent} from "../padlet-form/padlet-form.component";

@Component({
  selector: 'pd-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: []
})
export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entry[] = [];
  isEditMode: boolean = false;

  @ViewChild('form', {read: ViewContainerRef}) formContainer: ViewContainerRef;
  padletFormComponent: ComponentRef<PadletFormComponent>;

  constructor(
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngOnInit() {
    this.loadData(this.route.snapshot.params['id']);
  }

  loadData(padletId: string) {
    this.ps.getSingle(padletId).subscribe(res => this.padlet = res);
    this.ps.getEntriesById(padletId).subscribe(res => this.entries = res);
  }

  deletePadlet() {
    if (confirm('Are you sure you want to delete this padlet (' + this.padlet.name + ')?')) {
      this.toastr.warning("Entry deleted");
      this.ps.deletePadlet(this.padlet.id).subscribe(res => {
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    }
  }

  onDeleteClick(id: number) {
    if (confirm('Delete ' + this.entries?.find(e => e.id === id)?.name  + '?' )) {
      this.toastr.warning("Entry deleted");
      this.ps.deleteEntry(id).subscribe(() => {
        this.loadData(this.padlet.id.toString());
      });
    }
  }

  onEditClick() {
    this.isEditMode = !this.isEditMode;
    if(this.isEditMode) {
      this.padletFormComponent = this.formContainer.createComponent(PadletFormComponent);
      this.padletFormComponent.instance.padlet = this.padlet;
      this.padletFormComponent.instance.closeForm.subscribe(() => {
        this.isEditMode = false;
        this.padletFormComponent.destroy();
        this.loadData(this.padlet.id.toString());
      });
    } else {
      if(this.padletFormComponent) {
        this.padletFormComponent.destroy();
      }
    }
  }
}
