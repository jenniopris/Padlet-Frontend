import {User} from "./user";

export class Rating {
  constructor(public id: number,
              public rating: number,
              public user_id: number,
              public entry_id: number,
              public user: User) {
  }
}
