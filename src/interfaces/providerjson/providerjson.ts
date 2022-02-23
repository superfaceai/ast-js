export const PROVIDER_NAME_REGEX = new RegExp('^[a-z][_\\-a-z]*$');
export const PROVIDER_NAME_REGEX_SOURCE = PROVIDER_NAME_REGEX.source;

/**
 * Type of security value.
 */
export enum SecurityType {
  APIKEY = 'apiKey',
  OAUTH = 'oauth',
  HTTP = 'http',
}

/**
 * The placement of the API key.
 * @$id ApiKeyPlacement
 **/
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
  scheme: OAuthScheme;
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
export type ImplicitOAuthSecurityScheme = OAuthBase & {
  scheme: OAuthScheme.IMPLICIT;
  //TODO: when working with urls - make them absolute or use base url from provider json?
  authorizationUrl: string;
};

export type AuthorizationCodeOAuthSecurityScheme = OAuthBase & {
  scheme: OAuthScheme.AUTHORIZATION_CODE;
  authorizationUrl: string;
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

export type PasswordOAuthSecurityScheme = OAuthBase & {
  scheme: OAuthScheme.PASSWORD;
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

export type ClientCredentialsOAuthSecurityScheme = OAuthBase & {
  scheme: OAuthScheme.CLIENT_CREDENTIALS;
  //Some provider don't use refresh tokens at all
  tokenUrl?: string;
};

//TODO: make at least one security scheme required
export type OAuthFlow =
  | ImplicitOAuthSecurityScheme
  | AuthorizationCodeOAuthSecurityScheme
  | PasswordOAuthSecurityScheme
  | ClientCredentialsOAuthSecurityScheme;

/**
 * Security scheme for o auth authorization.
 * @$id OAuthSecurityScheme
 */
export type OAuthSecurityScheme = {
  id: string;
  type: SecurityType.OAUTH;
  flows: OAuthFlow[];
};

/**
 * Security scheme for api key authorization.
 * @$id ApiKeySecurityScheme
 */
export type ApiKeySecurityScheme = {
  id: string;
  type: SecurityType.APIKEY;
  /**
   * @$ref ApiKeyPlacement
   */
  in: ApiKeyPlacement;
  name?: string | undefined;
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
  bearerFormat?: string | undefined;
};

/**
 * Security scheme for digest authorization.
 * @$id DigestSecurityScheme
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
 * @$id ProviderJson
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
