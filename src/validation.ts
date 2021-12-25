import Ajv, { AnySchema } from 'ajv';
import addFormats from 'ajv-formats';

import { Assert, Guard } from './interfaces';

export function preparePrepareIs(
  schema: AnySchema
): <T>(id: string) => Guard<T> {
  const ajv = new Ajv({ allowUnionTypes: true });
  addFormats(ajv);
  ajv.addSchema(schema);

  return <T>(id: string) => {
    return (object: unknown): object is T => {
      if (ajv.validate(id, object)) {
        return true;
      }

      return false;
    };
  };
}

export function prepareAssert<T>(schema: AnySchema): Assert<T> {
  const ajv = new Ajv({ allowUnionTypes: true });
  addFormats(ajv);
  ajv.addSchema(schema);

  return function assert(input: unknown): asserts input is T {
    if (!ajv.validate(schema, input)) {
      throw new Error(ajv.errorsText());
    }
  };
}
