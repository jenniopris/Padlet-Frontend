export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const SharingFormErrorMessages = [
  new ErrorMessage('email', 'required', 'An email must be provided'),
  new ErrorMessage('email', 'email', 'Must be a valid email address'),
  new ErrorMessage('role', 'required', 'A role must be provided'),
];
