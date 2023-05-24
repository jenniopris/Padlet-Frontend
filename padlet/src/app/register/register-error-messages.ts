export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const RegisterErrorMessages = [
  new ErrorMessage('firstName', 'required', 'A first name must be provided'),
  new ErrorMessage('lastName', 'required', 'A last name must be provided'),
  new ErrorMessage('email', 'required', 'An email must be provided'),
  new ErrorMessage('password', 'required', 'A password must be provided'),
  new ErrorMessage('confirmPassword', 'required', 'A confirmation of your password must be provided'),
];
