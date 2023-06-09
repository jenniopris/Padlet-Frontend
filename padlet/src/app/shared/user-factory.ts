import {User} from "./user";
export class UserFactory {
  static empty(): User {
    return new User(
      0,
      '',
      '',
      '',
      ''
    )
  }

  static fromObject(rawUser: any): User {
    return new User(
      rawUser.id,
      rawUser.first_name,
      rawUser.last_name,
      rawUser.email,
      rawUser.role,
    );
  }
}
