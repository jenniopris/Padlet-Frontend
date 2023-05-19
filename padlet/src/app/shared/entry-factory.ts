import {Entry} from "./entry";
export class EntryFactory {
  static empty(): Entry {
    return new Entry(
      0,
      '',
      '',
      '',
      {
        id: 0,
        last_name: '',
        first_name: '',
        email: '',
      },
      0,
      0,
    )
  }

  static fromObject(rawEntry: any): Entry {
    return new Entry(
      rawEntry.id,
      rawEntry.name,
      rawEntry.content,
      rawEntry.type,
      rawEntry.user,
      rawEntry.padlet_id,
      rawEntry.user_id,
    );
  }
}
