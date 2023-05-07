import {Padlet} from "./padlet";

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(
      0,
      '',
      false,
      {id: 0, first_name: '', last_name: '', email: ''},
    );
  }

  static fromObject(rawBook: any): Padlet {
    return new Padlet(
      rawBook.id,
      rawBook.name,
      rawBook.is_public,
      rawBook.user_id,
    );
  }
}
