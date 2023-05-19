import {User} from "./user";

export class Comment {
  constructor(
    public id: number,
    public comment: string,
    public user_id: number,
    public entry_id: number,
    public created_at: Date,
    public user: User,
  ) {
  }
}
