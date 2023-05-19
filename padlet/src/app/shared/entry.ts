import {User} from "./user";

export class Entry {
  constructor(public id: number,
              public name: string,
              public content: string,
              public type: string,
              public user: User,
              public padlet_id: number,
              public user_id: number,) {
  }
}
