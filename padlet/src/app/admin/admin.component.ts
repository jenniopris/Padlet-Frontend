import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user";
import {PadletApiService} from "../shared/padlet-api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'pd-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit{
  users: User[] = [];

  constructor(
    private padletApiService: PadletApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.padletApiService.getAllUsers().subscribe(res => this.users = res);
  }
}
