export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const EntryFormErrorMessages = [
  new ErrorMessage('name', 'required', 'A name must be provided'),
  new ErrorMessage('content', 'required', 'A content must be provided'),
];
