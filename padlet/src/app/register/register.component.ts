import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletApiService} from "../shared/padlet-api.service";
import {User} from "../shared/user";
import {RegisterErrorMessages} from "./register-error-messages";
import {ToastrService} from "ngx-toastr";
import * as bcrypt from 'bcryptjs';
import {UserFactory} from "../shared/user-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'pd-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: { [key: string]: string } = {};
  user = UserFactory.empty();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ps: PadletApiService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
    this.registerForm.valueChanges.subscribe(() => this.updateErrorMessages());
  }
  async submitForm() {
    if (this.registerForm.valid && this.checkPassword()) {
      const newUser: User = new User(
        0,
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.email,
        'user',
        new Date(),
        await this.encryptPassword()
      );

      this.authService.register(newUser).subscribe((res) => {
        this.toastr.success("User created");
        this.user = UserFactory.empty();
        this.registerForm.reset(UserFactory.empty());
        this.router.navigate(["/login"], {
          relativeTo: this.route
        });
      },
        err => {
          console.error('Fehler beim Erstellen des Benutzers:', err);
          this.toastr.error('Creating a user failed!');
        }
      );
    }
  }

  checkPassword() {
    const val = this.registerForm.value;
    if (val.password != val.confirmPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      this.registerForm.get('confirmPassword')?.setValue('');
      return false;
    } else {
      return true;
    }
  }

  async encryptPassword() {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(this.registerForm.value.password, salt);
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of RegisterErrorMessages) {
      const control = this.registerForm.get(message.forControl);
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
