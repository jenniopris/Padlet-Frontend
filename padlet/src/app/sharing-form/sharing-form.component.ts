import { Component } from '@angular/core';
import {PadletFormErrorMessages} from "../padlet-form/padlet-form-error-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pd-sharing-form',
  templateUrl: './sharing-form.component.html',
  styles: [
  ]
})
export class SharingFormComponent {
  errors: { [key: string]: string } = {};
  searchingForm: FormGroup;

  updateErrorMessages() {
    console.log("Is form invalid? " + this.searchingForm.invalid);
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.searchingForm.get(message.forControl);
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
