import {Component, OnInit, ViewChild} from '@angular/core';
import {PadletFactory} from "../shared/padlet-factory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletApiService} from "../shared/padlet-api.service";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {Padlet} from "../shared/padlet";

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
    private router: Router
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

  initPadlet() {
  }

  submitForm() {
    const padlet = PadletFactory.fromObject(this.padletForm.value);
    padlet.user_id = 1; // TODO: change to currently logged in user

    this.ps.createPadlet(padlet).subscribe(() => {
      this.router.navigate(['/padlets'], {relativeTo: this.route});
    });
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
