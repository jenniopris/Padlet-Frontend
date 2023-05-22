import {Component, OnInit} from '@angular/core';
import {PadletApiService} from '../shared/padlet-api.service';
import {AuthenticationService} from '../shared/authentication.service';
import {User} from '../shared/user';
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'pd-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  private userId: number = 1;
  user: User = UserFactory.empty();

  constructor(
    private ps: PadletApiService,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    this.loadUser();
  }

  loadUser() {
    this.ps.getUserById(this.userId).subscribe((user: User) => {
      this.user = user;
    });
  }
}
