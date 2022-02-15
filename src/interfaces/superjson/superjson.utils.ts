import { prepareAssert, preparePrepareIs } from '../../validation';
import { Guard } from '..';
import { Assert } from '../ast';
import {
  ApiKeySecurityValues,
  BasicAuthSecurityValues,
  BearerTokenSecurityValues,
  DigestSecurityValues,
  FILE_URI_REGEX,
  OAuthSecurityValues,
  SEMVER_REGEX,
  SuperJsonDocument,
} from './superjson';
import * as schema from './superjson.schema.json';

const prepareIs = preparePrepareIs(schema);
const assertSuperJson: Assert<SuperJsonDocument> = prepareAssert(
  schema,
  'super-json'
);

export function isVersionString(input: string): boolean {
  return SEMVER_REGEX.test(input);
}

export function isFileURIString(input: string): boolean {
  return FILE_URI_REGEX.test(input);
}

export const assertSuperJsonDocument: (input: unknown) => SuperJsonDocument = (
  input: unknown
) => {
  assertSuperJson(input);

  return input;
};
export const isOAuthSecurityValues: Guard<OAuthSecurityValues> =
  createIs<OAuthSecurityValues>();
export const isApiKeySecurityValues: Guard<ApiKeySecurityValues> =
  prepareIs<ApiKeySecurityValues>('ApiKeySecurityValues');
export const isBasicAuthSecurityValues: Guard<BasicAuthSecurityValues> =
  prepareIs<BasicAuthSecurityValues>('BasicAuthSecurityValues');
export const isBearerTokenSecurityValues: Guard<BearerTokenSecurityValues> =
  prepareIs<BearerTokenSecurityValues>('BearerTokenSecurityValues');
export const isDigestSecurityValues: Guard<DigestSecurityValues> =
  prepareIs<DigestSecurityValues>('DigestSecurityValues');
