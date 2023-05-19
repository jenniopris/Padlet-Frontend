import {Component, OnInit, ViewChild} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletApiService} from "../shared/padlet-api.service";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";
import {AuthenticationService} from "../shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pd-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: []
})
export class PadletFormComponent implements OnInit {
  padletForm: FormGroup;
  padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
  ) {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name ?? '', Validators.required],
      is_public: [this.padlet.is_public ?? true],
    });
  }

  ngOnInit() {
    this.padletForm.valueChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    const padlet = PadletFactory.fromObject(this.padletForm.value);
    if (this.authService.isLoggedIn()) {
      padlet.user_id = this.authService.getCurrentUserId();
    } else {
      padlet.user_id = 1;
    }

    this.ps.createPadlet(padlet).subscribe(() => {
      this.router.navigate(['/padlets'], {relativeTo: this.route});
    });

    this.toastr.success("Padlet created");
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.padletForm.invalid);
    this.errors = {};
    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
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
