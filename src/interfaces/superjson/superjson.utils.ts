import { assertEquals, createIs, TypeGuardError } from 'typescript-is';

import { Guard } from '..';
import {
  ApiKeySecurityValues,
  BasicAuthSecurityValues,
  BearerTokenSecurityValues,
  DigestSecurityValues,
  FILE_URI_REGEX,
  SEMVER_REGEX,
  SuperJsonDocument,
} from './superjson';

export function isVersionString(input: string): boolean {
  return SEMVER_REGEX.test(input);
}

export function isFileURIString(input: string): boolean {
  return FILE_URI_REGEX.test(input);
}

export const assertSuperJsonDocument: (input: unknown) => SuperJsonDocument = (
  input: unknown
) => {
  const parsedInput = assertEquals<SuperJsonDocument>(input);

  // NOTE: This is value validation that can't be done by typescript-is now
  //       This is just temporary and will be performed by super.json semantic validator when it's done
  for (const [profileKey, profile] of Object.entries(
    parsedInput.profiles || {}
  )) {
    if (typeof profile === 'string') {
      if (!isVersionString(profile) && !isFileURIString(profile)) {
        throw new TypeGuardError(
          {
            message: 'there are no valid alternatives',
            path: ['$', 'profiles', profileKey],
            reason: { type: 'union' },
          },
          profile
        );
      }
    } else {
      if ('version' in profile && !isVersionString(profile.version)) {
        throw new TypeGuardError(
          {
            message: 'invalid version string format',
            path: ['$', 'profiles', profileKey, 'version'],
            reason: { type: 'string' },
          },
          profile.version
        );
      }

      for (const [providerKey, provider] of Object.entries(
        profile.providers || {}
      )) {
        if (typeof provider === 'string') {
          if (!isVersionString(provider) && !isFileURIString(provider)) {
            throw new TypeGuardError(
              {
                message: 'there are no valid alternatives',
                path: ['$', 'profiles', profileKey, 'providers', providerKey],
                reason: { type: 'union' },
              },
              provider
            );
          }
        }
      }
    }
  }

  for (const [providerKey, provider] of Object.entries(
    parsedInput.providers || {}
  )) {
    if (typeof provider === 'string') {
      if (!isFileURIString(provider)) {
        throw new TypeGuardError(
          {
            message: 'there are no valid alternatives',
            path: ['$', 'providers', providerKey],
            reason: { type: 'union' },
          },
          provider
        );
      }
    }
  }

  return parsedInput;
};

export const isApiKeySecurityValues: Guard<ApiKeySecurityValues> =
  createIs<ApiKeySecurityValues>();
export const isBasicAuthSecurityValues: Guard<BasicAuthSecurityValues> =
  createIs<BasicAuthSecurityValues>();
export const isBearerTokenSecurityValues: Guard<BearerTokenSecurityValues> =
  createIs<BearerTokenSecurityValues>();
export const isDigestSecurityValues: Guard<DigestSecurityValues> =
  createIs<DigestSecurityValues>();
