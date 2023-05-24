import {Component, OnInit} from '@angular/core';
import {PadletApiService} from '../shared/padlet-api.service';
import {AuthenticationService} from '../shared/authentication.service';
import {User} from '../shared/user';
import {UserFactory} from "../shared/user-factory";
import {ActivatedRoute} from "@angular/router";
import {PadletUserRole} from "../shared/padletUserRole";

@Component({
  selector: 'pd-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  private userId: number = 1;
  user: User = UserFactory.empty();
  invites: PadletUserRole[] = [];

  constructor(
    private ps: PadletApiService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    if(this.route.snapshot.params['userId']) {
      this.userId = this.route.snapshot.params['userId'];
    } else {
      this.userId = this.authService.getCurrentUserId();
    }
    this.loadUser();
    if(this.userId == this.authService.getCurrentUserId()) {
      this.getInvites();
    }
  }

  loadUser() {
    this.ps.getUserById(this.userId).subscribe((user: User) => {
      this.user = user;
    });
  }
  getInvites() {
    this.ps.getInvitesByUserId(this.userId).subscribe(res => this.invites = res);
  }

  onInviteAccept(invite: PadletUserRole) {
    invite.role = invite.role.substring(invite.role.indexOf('-')+1, invite.role.length);
    this.ps.updateRole(invite).subscribe(res => {
      this.getInvites();
    });
  }

  onInviteDecline(invite: PadletUserRole) {
    this.ps.deleteRole(invite.id).subscribe(res => {
      this.getInvites();
    });
  }
}
