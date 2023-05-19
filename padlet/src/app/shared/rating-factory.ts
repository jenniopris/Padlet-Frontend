import {Rating} from "./rating";
export class RatingFactory {
  static empty(): Rating {
    return new Rating(
      0,
      0,
      0,
      0,
      {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
      }
    )
  }

  static fromObject(rawRating: any): Rating {
    return new Rating(
      rawRating.id,
      rawRating.rating,
      rawRating.user_id,
      rawRating.entry_id,
      rawRating.user,
    );
  }
}
