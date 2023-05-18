export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const PadletFormErrorMessages = [
  new ErrorMessage('name', 'required', 'A name must be provided'),
];
