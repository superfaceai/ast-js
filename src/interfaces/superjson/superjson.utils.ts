import { prepareAssert, preparePrepareIs } from '../../validation';
import { Guard } from '..';
import { Assert } from '../ast';
import {
  ApiKeySecurityValues,
  BasicAuthSecurityValues,
  BearerTokenSecurityValues,
  DigestSecurityValues,
  FILE_URI_REGEX,
  SEMVER_REGEX,
  SuperJsonDocument,
} from './superjson';
import * as schema from './superjson.schema.json';

const prepareIs = preparePrepareIs(schema);
const assertEquals: Assert<SuperJsonDocument> = prepareAssert(schema);

export function isVersionString(input: string): boolean {
  return SEMVER_REGEX.test(input);
}

export function isFileURIString(input: string): boolean {
  return FILE_URI_REGEX.test(input);
}

export const assertSuperJsonDocument: (input: unknown) => SuperJsonDocument = (
  input: unknown
) => {
  assertEquals(input);

  return input;
  // let parsedInput: SuperJsonDocument;
  // try {
  //   parsedInput = assertEquals<SuperJsonDocument>(input);
  // } catch (error) {
  //   if (error instanceof TypeGuardError) {
  //     throw new AssertionError(`Super.json ${error.message}`, error.path);
  //   }
  //   throw error;
  // }

  // // NOTE: This is value validation that can't be done by typescript-is now
  // //       This is just temporary and will be performed by super.json semantic validator when it's done
  // for (const [profileKey, profile] of Object.entries(
  //   parsedInput.profiles || {}
  // )) {
  //   if (typeof profile === 'string') {
  //     if (!isVersionString(profile) && !isFileURIString(profile)) {
  //       throw new AssertionError('there are no valid alternatives', [
  //         '$',
  //         'profiles',
  //         profileKey,
  //       ]);
  //     }
  //   } else {
  //     if ('version' in profile && !isVersionString(profile.version)) {
  //       throw new AssertionError('invalid version string format', [
  //         '$',
  //         'profiles',
  //         profileKey,
  //         'version',
  //       ]);
  //     }

  //     for (const [providerKey, provider] of Object.entries(
  //       profile.providers || {}
  //     )) {
  //       if (typeof provider === 'string') {
  //         if (!isVersionString(provider) && !isFileURIString(provider)) {
  //           throw new AssertionError('there are no valid alternatives', [
  //             '$',
  //             'profiles',
  //             profileKey,
  //             'providers',
  //             providerKey,
  //           ]);
  //         }
  //       }
  //     }
  //   }
  // }

  // for (const [providerKey, provider] of Object.entries(
  //   parsedInput.providers || {}
  // )) {
  //   if (typeof provider === 'string') {
  //     if (!isFileURIString(provider)) {
  //       throw new AssertionError('there are no valid alternatives', [
  //         '$',
  //         'providers',
  //         providerKey,
  //       ]);
  //     }
  //   }
  // }

  // return parsedInput;
};

export const isApiKeySecurityValues: Guard<ApiKeySecurityValues> =
  prepareIs<ApiKeySecurityValues>('ApiKeySecurityValues');
export const isBasicAuthSecurityValues: Guard<BasicAuthSecurityValues> =
  prepareIs<BasicAuthSecurityValues>('BasicAuthSecurityValues');
export const isBearerTokenSecurityValues: Guard<BearerTokenSecurityValues> =
  prepareIs<BearerTokenSecurityValues>('BearerTokenSecurityValues');
export const isDigestSecurityValues: Guard<DigestSecurityValues> =
  prepareIs<DigestSecurityValues>('DigestSecurityValues');
