import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletApiService} from "../shared/padlet-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pd-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: [
  ]
})
export class PadletListComponent implements OnInit {
  padlets: Padlet[] = [];

  constructor(private padletApiService: PadletApiService) { }
  ngOnInit() {
    this.padletApiService.getAllPadlets().subscribe(res => this.padlets = res);
  }

  protected readonly alert = alert;
}
