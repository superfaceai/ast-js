export const PROVIDER_NAME_REGEX = new RegExp('^[a-z][_\\-a-z]*$');
export const PROVIDER_NAME_REGEX_SOURCE = PROVIDER_NAME_REGEX.source;

/**
 * Type of security value.
 */
export enum SecurityType {
  APIKEY = 'apiKey',
  HTTP = 'http',
}

/**
 * The placement of the API key.
 * @$id ApiKeyPlacement
 */
export enum ApiKeyPlacement {
  HEADER = 'header',
  BODY = 'body',
  PATH = 'path',
  QUERY = 'query',
}

/**
 * Type of HTTP Authentication Scheme.
 */
export enum HttpScheme {
  BASIC = 'basic',
  BEARER = 'bearer',
}

/**
 * Body type to inject security value to.
 * @$id ApiKeyBodyType
 */
export enum ApiKeyBodyType {
  JSON = 'json',
}

/**
 * Security scheme for api key authorization.
 * @$id ApiKeySecurityScheme
 */
export type ApiKeySecurityScheme = {
  id: string;
  type: SecurityType.APIKEY;
  /** @$ref ApiKeyPlacement */
  in: ApiKeyPlacement;
  bodyType?: ApiKeyBodyType;
  name?: string;
};

/**
 * Security scheme for basic authorization.
 * @$id BasicAuthSecurityScheme
 */
export type BasicAuthSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BASIC;
};

/**
 * Security scheme for bearer authorization.
 * @$id BearerTokenSecurityScheme
 */
export type BearerTokenSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BEARER;
  bearerFormat?: string;
};

/**
 * Type describing general security scheme.
 */
export type SecurityScheme =
  | ApiKeySecurityScheme
  | BasicAuthSecurityScheme
  | BearerTokenSecurityScheme;

export type ProviderService = {
  id: string;
  baseUrl: string;
};

/**
 * Parameter needed for use of provider.
 */
export type IntegrationParameter = {
  /**
   * @pattern require('../ast/utils').IDENTIFIER_RE_SOURCE
   */
  name: string;
  description?: string;
  default?: string;
};

/**
 * Type decribing provider.json document.
 * @$id ProviderJson
 */
export type ProviderJson = {
  /**
   * @pattern require('.').PROVIDER_NAME_REGEX_SOURCE
   */
  name: string;
  services: ProviderService[];
  securitySchemes?: SecurityScheme[];
  defaultService: string;
  parameters?: IntegrationParameter[];
};
