export class Comment {
  constructor(public id: number,
              public content: string,
              public user_id: number,
              public entry_id: number) {
  }
}
