function assembleMessage(errors: [message: string, path: string[]][]) {
  return errors
    .map(([message, path]) => `${['$', ...path].join('.')}: ${message}`)
    .join('\n');
}

export class AssertionError extends Error {
  constructor(
    public readonly errors: [message: string, path: string[]][],
    private readonly data: unknown
  ) {
    super(assembleMessage(errors));
    Object.setPrototypeOf(this, AssertionError.prototype);
  }

  toString(): string {
    return this.message;
  }

  detailed(): string {
    return [
      'Found errors:',
      ...this.message,
      'Validated data:',
      JSON.stringify(this.data, undefined, 2),
    ].join('\n');
  }
}
