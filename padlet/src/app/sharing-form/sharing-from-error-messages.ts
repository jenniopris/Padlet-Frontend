export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const SearchingFormErrorMessages = [
  new ErrorMessage('email', 'required', 'An email must be provided'),
  new ErrorMessage('role', 'required', 'A role must be provided'),
];
