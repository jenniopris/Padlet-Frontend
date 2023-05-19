import {Padlet} from "./padlet";

export class PadletFactory {

  static empty(): Padlet {
    return new Padlet(
      0,
      '',
      false,
      {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        role: '',
      },
      0,
    );
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user,
      rawPadlet.user_id,
    );
  }
}
