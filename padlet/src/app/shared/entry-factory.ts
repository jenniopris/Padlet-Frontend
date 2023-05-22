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
        role: '',
      },
      0,
      0,
      new Date(),
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
      rawEntry.created_at,
    );
  }
}
