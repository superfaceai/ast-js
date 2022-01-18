import { prepareAssert, preparePrepareIs } from '../../validation';
import { Assert, Guard } from '../ast';
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
import * as schema from './providerjson.schema.json';

export function isValidProviderName(name: string): boolean {
  return PROVIDER_NAME_REGEX.test(name);
}

const prepareIs = preparePrepareIs(schema);

export const isProviderJson: Guard<ProviderJson> =
  prepareIs<ProviderJson>('ProviderJson');

const assertProvider: Assert<ProviderJson> = prepareAssert<ProviderJson>(
  schema,
  'provider-json'
);
export function assertProviderJson(input: unknown): ProviderJson {
  assertProvider(input);

  return input;
}

export const isApiKeySecurityScheme: Guard<ApiKeySecurityScheme> =
  prepareIs<ApiKeySecurityScheme>('ApiKeySecurityScheme');
export const isBasicAuthSecurityScheme: Guard<BasicAuthSecurityScheme> =
  prepareIs<BasicAuthSecurityScheme>('BasicAuthSecurityScheme');
export const isBearerTokenSecurityScheme: Guard<BearerTokenSecurityScheme> =
  prepareIs<BearerTokenSecurityScheme>('BearerTokenSecurityScheme');
export const isDigestSecurityScheme: Guard<DigestSecurityScheme> =
  prepareIs<DigestSecurityScheme>('DigestSecurityScheme');

export function prepareSecurityValues(
  providerName: string,
  schemes: SecurityScheme[]
): SecurityValues[] {
  const security: SecurityValues[] = [];

  for (const scheme of schemes) {
    const envProviderName = providerName.replace(/-/g, '_').toUpperCase();
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
        username: `$${envProviderName}_USERNAME`,
        password: `$${envProviderName}_PASSWORD`,
      });
    }
  }

  return security;
}

export function prepareProviderParameters(
  providerName: string,
  parameters: IntegrationParameter[]
): {
  [key: string]: string;
} {
  const envProviderName = providerName.replace(/-/g, '_').toUpperCase();
  const preparedParameters: { [key: string]: string } = {};
  for (const parameter of parameters) {
    const envParameterName = parameter.name.replace(/-/g, '_').toUpperCase();
    preparedParameters[
      parameter.name
    ] = `$${envProviderName}_${envParameterName}`;
  }

  return preparedParameters;
}
