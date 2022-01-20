export const PROVIDER_NAME_REGEX = new RegExp('^[a-z][_\\-a-z]*$');
export const PROVIDER_NAME_REGEX_SOURCE = PROVIDER_NAME_REGEX.source;

/**
 * Type of security value.
 */
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

//OAuth
export enum OAuthClientAuthenticationMethod {
  CLIENT_SECRET_BASIC = 'client_secret_basic',
  CLIENT_SECRET_POST = 'client_secret_post',
  //TODO: jwt?
}

export enum OAuthScheme {
  IMPLICIT = 'implicit',
  AUTHORIZATION_CODE = 'authorizationCode',
  PASSWORD = 'password',
  CLIENT_CREDENTIALS = 'clientCredentials',
  //TODO: missing something?
}

type OAuthBase = {
  //In all OAuth security schemes
  scopes: string[];
  refreshUrl?: string;

  //Customizable oauth properties
  /**
   * Defines how SDK sends client credentials, default is 'client_secret_basic'
   */
  clientAuthenticationMethod?: OAuthClientAuthenticationMethod;

  /**
   * Defines which HTTP status code is marking expired access token, default is 401
   */
  //TODO: better name
  refreshStatusCode?: number;

  /**
   * Secopes separator, default is whitespace
   */
  scopesSepartor?: string;
};

//stolen from postman and openAPI: https://swagger.io/specification/#oauth-flows-object
type ImplicitOAuthSecurityScheme = OAuthBase & {
  //TODO: when working with urls - make them absolute or use base url from provider json?
  authorizationUrl: string;
};

type AuthorizationCodeOAuthSecurityScheme = OAuthBase & {
  authorizationUrl: string;
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

type PasswordOAuthSecurityScheme = OAuthBase & {
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

type ClientCredentialsOAuthSecurityScheme = OAuthBase & {
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

//TODO: make at least one security scheme required
export type OAuthSecurityScheme = {
  [OAuthScheme.IMPLICIT]?: ImplicitOAuthSecurityScheme;
  [OAuthScheme.AUTHORIZATION_CODE]?: AuthorizationCodeOAuthSecurityScheme;
  [OAuthScheme.PASSWORD]?: PasswordOAuthSecurityScheme;
  [OAuthScheme.CLIENT_CREDENTIALS]?: ClientCredentialsOAuthSecurityScheme;
};

/**
 * Security scheme for api key authorization.
 */
export type ApiKeySecurityScheme = {
  id: string;
  type: SecurityType.APIKEY;
  in: ApiKeyPlacement;
  name?: string | undefined;
};

/**
 * Security scheme for basic authorization.
 */
export type BasicAuthSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BASIC;
};

/**
 * Security scheme for bearer authorization.
 */
export type BearerTokenSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.BEARER;
  bearerFormat?: string | undefined;
};

/**
 * Security scheme for digest authorization.
 */
export type DigestSecurityScheme = {
  id: string;
  type: SecurityType.HTTP;
  scheme: HttpScheme.DIGEST;
  /**
   * Code that should be returned from initial call for challenge eg. 401
   */
  statusCode?: number | undefined;
  /**
   * Name of header containing challenge from the server eg. www-authenticate
   */
  challengeHeader?: string | undefined;
  /**
   * Name of header containing authorization eg. Authorization
   */
  authorizationHeader?: string | undefined;
};

/**
 * Type describing general security scheme.
 */
export type SecurityScheme =
  | ApiKeySecurityScheme
  | BasicAuthSecurityScheme
  | BearerTokenSecurityScheme
  | DigestSecurityScheme
  | OAuthSecurityScheme;

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
  description?: string | undefined;
  default?: string | undefined;
};

/**
 * Type decribing provider.json document.
 */
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
