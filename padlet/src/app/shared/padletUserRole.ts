import {Padlet, User} from "./padlet";

export class PadletUserRole {
  constructor(
    public id: number,
    public padlet_id: number,
    public user_id: number,
    public role: string,
    public padlet?: Padlet,
    public invited_by?: string,
  ) {
  }
}
