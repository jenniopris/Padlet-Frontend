import {Comment} from "./comment";
export class CommentFactory {
  static empty(): Comment {
    return new Comment(
      0,
      '',
      0,
      0,
      new Date(),
      {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
      }
    )
  }

  static fromObject(rawComment: any): Comment {
    return new Comment(
      rawComment.id,
      rawComment.comment,
      rawComment.user_id,
      rawComment.entry_id,
      rawComment.created_at,
      rawComment.user,
    );
  }
}
