import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/padlet";
import {EntryFactory} from "../shared/entry-factory";
import {EntryFormErrorMessages} from "./entry-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pd-entry-form',
  templateUrl: './entry-form.component.html',
  styles: []
})
export class EntryFormComponent implements OnInit {

  entryForm: FormGroup;
  entry = EntryFactory.empty();
  errors: { [key: string]: string } = {};
  public padletId: number = 0;

  constructor(
    private fb: FormBuilder,
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
  ) {
    this.entryForm = this.fb.group({
      id: this.entry.id,
      name: [this.entry.name ?? '', Validators.required],
      content: [this.entry.content ?? '', Validators.required],
    });
  }

  ngOnInit() {
    this.entryForm.valueChanges.subscribe(() => this.updateErrorMessages());
    this.padletId = this.route.snapshot.params['padletId'];
  }

  submitForm() {
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
    entry.padlet_id = this.padletId;
    entry.type = 'text';
    entry.user_id = this.authService.getCurrentUserId();

    this.ps.createEntry(entry).subscribe(() => {
      this.router.navigate(['/padlets', this.padletId], {relativeTo: this.route});
    });

    this.toastr.success("Entry created");
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of EntryFormErrorMessages) {
      const control = this.entryForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
