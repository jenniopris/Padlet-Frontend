export class User {
  constructor(public id: number,
              public first_name: string,
              public last_name: string,
              public email: string,
              public role?: string,
              public created_at?: Date,
              private password?: string) {
  }
}
