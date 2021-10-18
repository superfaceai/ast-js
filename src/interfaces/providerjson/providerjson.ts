export const PROVIDER_NAME_REGEX = new RegExp('^[a-z][_\\-a-z]*$');
export const PROVIDER_NAME_REGEX_SOURCE = PROVIDER_NAME_REGEX.source;

export enum SecurityType {
  APIKEY = 'apiKey',
  HTTP = 'http',
}

export enum ApiKeyPlacement {
  HEADER = 'header',
  BODY = 'body',
  PATH = 'path',
  QUERY = 'query',
}

export enum HttpScheme {
  BASIC = 'basic',
  BEARER = 'bearer',
  DIGEST = 'digest',
}

export type ApiKeySecurityScheme = {
  id: string;
  type: SecurityType.APIKEY;
  in: ApiKeyPlacement;
  name?: string | undefined;
};

export type BasicAuthSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BASIC;
};

export type BearerTokenSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BEARER;
  bearerFormat?: string | undefined;
};

export type DigestSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.DIGEST;
};

export type SecurityScheme =
  | ApiKeySecurityScheme
  | BasicAuthSecurityScheme
  | BearerTokenSecurityScheme
  | DigestSecurityScheme;

export type ProviderService = {
  id: string;
  baseUrl: string;
};

export type IntegrationParameter = {
  /**
   * @pattern require('../ast/utils').IDENTIFIER_RE_SOURCE
   */
  name: string;
  description?: string | undefined;
  default?: string | undefined;
};

export type ProviderJson = {
  /**
   * @pattern require('.').PROVIDER_NAME_REGEX_SOURCE
   */
  name: string;
  services: ProviderService[];
  securitySchemes?: SecurityScheme[] | undefined;
  defaultService: string;
  parameters?: IntegrationParameter[] | undefined;
};