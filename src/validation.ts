import Ajv, { AnySchema, DefinedError } from 'ajv';
import addFormats from 'ajv-formats';

import { AssertionError } from './error';
import { Assert, Guard } from './interfaces';

const ajv = new Ajv({ allowUnionTypes: true });
addFormats(ajv);

export function preparePrepareIs(
  schema: AnySchema
): <T>(id: string) => Guard<T> {
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

function ajvErrorToMessage(ajvError: DefinedError, value: unknown): string {
  switch (ajvError.keyword) {
    case 'maxItems':
      return `must have at most ${ajvError.params.limit} items`;
    case 'minItems':
      return `must have at least ${ajvError.params.limit} items`;
    case 'maxLength':
      return `must be at most ${ajvError.params.limit} characters long`;
    case 'minLength':
      return `must be at least ${ajvError.params.limit} characters long`;
    case 'maxProperties':
      return `must have at most ${ajvError.params.limit} properties`;
    case 'minProperties':
      return `must have at least ${ajvError.params.limit} properties`;
    case 'additionalItems':
      return `must not have more than ${ajvError.params.limit} items`;
    case 'additionalProperties':
      return `must not have additional property "${ajvError.params.additionalProperty}"`;
    case 'dependencies':
      return `must have ${ajvError.params.depsCount} properties`;
    case 'format':
      return `must be a ${ajvError.params.format}`;
    case 'maximum':
      return `must be at most ${ajvError.params.limit}`;
    case 'minimum':
      return `must be at least ${ajvError.params.limit}`;
    case 'exclusiveMaximum':
      return `must be less than ${ajvError.params.limit}`;
    case 'exclusiveMinimum':
      return `must be greater than ${ajvError.params.limit}`;
    case 'multipleOf':
      return `must be a multiple of ${ajvError.params.multipleOf}`;
    case 'pattern':
      return `must match pattern "${ajvError.params.pattern}"`;
    case 'required':
      return `must have required property "${ajvError.params.missingProperty}"`;
    case 'propertyNames':
      return `must have property "${ajvError.params.propertyName}"`;
    case 'type':
      return `must be ${ajvError.params.type}, received ${typeof value}`;
    case 'anyOf':
      return 'must match one of the valid types';
    case 'enum':
      return `invalid enum value, expected one of: ${ajvError.params.allowedValues.join(
        ', '
      )}, received "${String(value)}"`;
    default:
      console.log(ajvError);

      return `must be valid`;
  }
}

function digIntoInput(input: unknown, path: string[]) {
  let current = input;

  for (const key of path) {
    if (current === undefined) {
      return undefined;
    }

    if (
      typeof current === 'string' ||
      typeof current === 'number' ||
      typeof current === 'boolean'
    ) {
      return current;
    }

    if (typeof current === 'object') {
      if (current === null) {
        return current;
      }
    }

    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

export function prepareAssert<T>(schema: AnySchema, key: string): Assert<T> {
  ajv.addSchema(schema, key);

  return function assert(input: unknown): asserts input is T {
    if (!ajv.validate(schema, input)) {
      const errorEntries = (ajv.errors as DefinedError[]).map<
        [string, string[]]
      >(ajvError => {
        const path = ajvError.instancePath
          .split('/')
          .filter(value => value !== '');

        return [ajvErrorToMessage(ajvError, digIntoInput(input, path)), path];
      });

      throw new AssertionError(errorEntries, input);
    }
  };
}
