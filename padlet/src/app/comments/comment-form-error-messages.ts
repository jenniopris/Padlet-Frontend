export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const CommentFormErrorMessages = [
  new ErrorMessage('comment', 'required', 'A content must be provided'),
];
