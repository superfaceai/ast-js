import Ajv from "ajv"

import * as providerJsonSchema from './interfaces/providerjson/providerjson.schema.json'

export const ajv = new Ajv()
ajv.addSchema(providerJsonSchema)

//TODO: constrain T and try to get rid of id
export function prepareIs<T>(id: string): (object: unknown) => object is T {
  const validate = ajv.getSchema<T>(id)
  if (!validate) {
    throw new Error(`Schema with $id ${id} not found`)
  }

  return (object: unknown): object is T => {
    if (validate(object)) {
      return true
    }

    return false
  }
}
