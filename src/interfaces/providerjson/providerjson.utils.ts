import { assertEquals, createIs, TypeGuardError } from 'typescript-is';

import { Guard, isValidIdentifier } from '../ast';
import { SecurityValues } from '../superjson';
import { IntegrationParameter } from '.';
import {
  ApiKeySecurityScheme,
  BasicAuthSecurityScheme,
  BearerTokenSecurityScheme,
  DigestSecurityScheme,
  PROVIDER_NAME_REGEX,
  ProviderJson,
  SecurityScheme,
} from './providerjson';

export function isValidProviderName(name: string): boolean {
  return PROVIDER_NAME_REGEX.test(name);
}

export const isProviderJson: Guard<ProviderJson> = createIs<ProviderJson>();

export function assertProviderJson(input: unknown): ProviderJson {
  const parsedInput = assertEquals<ProviderJson>(input);
  if (!isValidProviderName(parsedInput.name)) {
    throw new TypeGuardError(
      {
        message: 'invalid provider name',
        path: ['$', 'name'],
        reason: { type: 'string' },
      },
      parsedInput.name
    );
  }

  if (parsedInput.parameters !== undefined) {
    for (const [index, parameter] of parsedInput.parameters.entries()) {
      if (!isValidIdentifier(parameter.name)) {
        throw new TypeGuardError(
          {
            message: 'invalid parameter name',
            path: ['$', 'parameters', index.toString()],
            reason: { type: 'string' },
          },
          parameter.name
        );
      }
    }
  }

  return parsedInput;
}

export const isApiKeySecurityScheme: Guard<ApiKeySecurityScheme> =
  createIs<ApiKeySecurityScheme>();
export const isBasicAuthSecurityScheme: Guard<BasicAuthSecurityScheme> =
  createIs<BasicAuthSecurityScheme>();
export const isBearerTokenSecurityScheme: Guard<BearerTokenSecurityScheme> =
  createIs<BearerTokenSecurityScheme>();
export const isDigestSecurityScheme: Guard<DigestSecurityScheme> =
  createIs<DigestSecurityScheme>();

export function prepareSecurityValues(
  providerName: string,
  schemes: SecurityScheme[]
): SecurityValues[] {
  const security: SecurityValues[] = [];

  for (const scheme of schemes) {
    const envProviderName = providerName.replace('-', '_').toUpperCase();
    if (isApiKeySecurityScheme(scheme)) {
      security.push({
        id: scheme.id,
        apikey: `$${envProviderName}_API_KEY`,
      });
    } else if (isBasicAuthSecurityScheme(scheme)) {
      security.push({
        id: scheme.id,
        username: `$${envProviderName}_USERNAME`,
        password: `$${envProviderName}_PASSWORD`,
      });
    } else if (isBearerTokenSecurityScheme(scheme)) {
      security.push({
        id: scheme.id,
        token: `$${envProviderName}_TOKEN`,
      });
    } else if (isDigestSecurityScheme(scheme)) {
      security.push({
        id: scheme.id,
        digest: `$${envProviderName}_DIGEST`,
      });
    }
  }

  return security;
}

export function prepareProviderParameters(parameters: IntegrationParameter[]): {
  [key: string]: string;
} {
  const preparedParameters: { [key: string]: string } = {};
  for (const parameter of parameters) {
    preparedParameters[parameter.name] = parameter.default || '';
  }

  return preparedParameters;
}