import{User} from './user';
export {User} from './user';
import{Entry} from './entry';
export {Entry} from './entry';

export class Padlet {
  constructor(public id: number,
              public name: string,
              public is_public: boolean,
              public user_id: number,
              public entry_id: Entry[],) {
  }
}
