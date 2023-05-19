import {Component, OnInit} from '@angular/core';
import {Padlet, User} from "../shared/padlet";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'pd-padlet-list',
  templateUrl: './padlet-list.component.html',
  styles: []
})
export class PadletListComponent implements OnInit {

  padlets: Padlet[] = [];
  protected readonly alert = alert;
  isEditMode: boolean = false;

  userName: string = "";

  constructor(
    private padletApiService: PadletApiService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.loadPadlets();
    if (this.authService.isLoggedIn()) {
    this.padletApiService.getUserById(this.authService.getCurrentUserId())
      .subscribe(res => this.userName = res.first_name + " " + res.last_name);
    }
  }

  loadPadlets() {
    this.padletApiService.getAllPadlets().subscribe(res => this.padlets = res);
  }

}
