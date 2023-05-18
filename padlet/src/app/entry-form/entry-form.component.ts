import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Entry, Padlet} from "../shared/padlet";
import {EntryFactory} from "../shared/entry-factory";

@Component({
  selector: 'pd-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent {
  entryForm: FormGroup;
  entry = EntryFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private ps: PadletApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
  }

  ngOnInit() {
    this.entryForm.valueChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    const entry: Entry = EntryFactory.fromObject(this.entryForm.value);
  }

  updateErrorMessages() {

  }
}
