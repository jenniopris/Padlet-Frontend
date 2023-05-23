import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PadletUserRole} from "../shared/padletUserRole";
import {SharingFormErrorMessages} from "./sharing-from-error-messages";

@Component({
  selector: 'pd-sharing-form',
  templateUrl: './sharing-form.component.html',
  styles: []
})
export class SharingFormComponent {
  errors: { [key: string]: string } = {};
  sharingForm: FormGroup;

  constructor(
    private ps: PadletApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.sharingForm = this.fb.group({
      padlet_id: params['padletId'],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
    this.sharingForm.valueChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    this.ps.getUserBySearchTerm(this.sharingForm.value.email).subscribe(user => {
      if (Array.isArray(user)) user = user[0];
      if(user) {
        const invite = new PadletUserRole(
          0,
          this.sharingForm.value.padlet_id,
          user.id,
          this.sharingForm.value.role,
        );

        this.ps.saveRole(invite).subscribe(res => {
          this.sharingForm.get('email')?.setValue('');
          this.errors = {};
          this.toastr.info('Invite sent!', 'Success!');
        });
      } else {
        this.toastr.error('User not found!', 'Error!');
      }
    });
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.sharingForm.invalid);
    this.errors = {};
    for (const message of SharingFormErrorMessages) {
      const control = this.sharingForm.get(message.forControl);
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
