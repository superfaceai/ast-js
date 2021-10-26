export class AssertionError extends Error {
  constructor(public readonly message: string, public readonly path: string[]) {
    super(message);
  }

  toString(): string {
    return this.message;
  }
}
