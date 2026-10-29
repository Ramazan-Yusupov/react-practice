export type FieldErrors = Record<string, string[] | undefined>;

export class HttpError extends Error {
  readonly status: number;
  readonly fieldErrors: FieldErrors | undefined;

  // Без `constructor(public status: number)`: параметр-свойство запрещён erasableSyntaxOnly
  constructor(status: number, message: string, fieldErrors?: FieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
