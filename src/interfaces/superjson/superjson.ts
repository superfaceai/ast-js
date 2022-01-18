// 'Official' regex https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
export const SEMVER_REGEX =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
export const SEMVER_REGEX_SOURCE = SEMVER_REGEX.source;

// NOT comprehensive at all
export const FILE_URI_PROTOCOL = 'file://';
export const FILE_URI_REGEX = /^file:\/\//;
export const FILE_URI_REGEX_SOURCE = FILE_URI_REGEX.source;

/**
 * @pattern require('.').SEMVER_REGEX_SOURCE
 **/
export type SemanticVersion = string;

/**
 * @pattern require('.').FILE_URI_REGEX_SOURCE
 **/
export type UriPath = string;

// Retry policy
export enum OnFail {
  NONE = 'none',
  CIRCUIT_BREAKER = 'circuit-breaker',
}

export enum BackoffKind {
  EXPONENTIAL = 'exponential',
}

/**
 * RetryPolicy per usecase values.
 */
export type RetryPolicy =
  | OnFail.NONE
  | OnFail.CIRCUIT_BREAKER
  | {
      kind: OnFail.NONE;
    }
  | {
      kind: OnFail.CIRCUIT_BREAKER;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      maxContiguousRetries?: number | undefined;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      requestTimeout?: number | undefined;
      backoff?:
        | BackoffKind.EXPONENTIAL
        | {
            kind: BackoffKind.EXPONENTIAL;
            /**
             * @TJS-minimum 0
             * @TJS-type integer
             **/
            start?: number | undefined;
            /**
             * @TJS-minimum 0
             * @TJS-type integer
             **/
            factor?: number | undefined;
          }
        | undefined;
    };

export type NormalizedRetryPolicy =
  | {
      kind: OnFail.NONE;
    }
  | {
      kind: OnFail.CIRCUIT_BREAKER;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      maxContiguousRetries?: number | undefined;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      requestTimeout?: number | undefined;
      backoff?:
        | {
            kind: BackoffKind.EXPONENTIAL;
            /**
             * @TJS-minimum 0
             * @TJS-type integer
             **/
            start?: number | undefined;
            /**
             * @TJS-minimum 0
             * @TJS-type integer
             **/
            factor?: number | undefined;
          }
        | undefined;
    };

/**
 * Default per usecase values.
 */
export type UsecaseDefaults = {
  [usecase: string]: {
    input?: { [key: string]: unknown } | undefined;
    providerFailover?: boolean | undefined;
  };
};

export type NormalizedUsecaseDefaults = {
  [usecase: string]: {
    input: { [key: string]: unknown };
    providerFailover: boolean;
  };
};

/**
 * Default per provider usecase values.
 */
export type ProfileProviderDefaults = {
  [provider: string]: {
    input?: { [key: string]: unknown } | undefined;
    retryPolicy?: RetryPolicy | undefined;
  };
};

export type NormalizedProfileProviderDefaults = {
  [provider: string]: {
    input: { [key: string]: unknown };
    retryPolicy: NormalizedRetryPolicy;
  };
};

/**
 * Provider settings for specific profile.
 */
export type ProfileProviderSettings = {
  defaults?: ProfileProviderDefaults | undefined;
} & (
  | {
      file: string;
    }
  | {
      mapVariant?: string | undefined;
      mapRevision?: string | undefined;
    }
);

export type NormalizedProfileProviderSettings =
  | {
      file: string;
      defaults: NormalizedProfileProviderDefaults;
    }
  | {
      mapVariant?: string | undefined;
      mapRevision?: string | undefined;
      defaults: NormalizedProfileProviderDefaults;
    };

/**
 * Profile provider entry containing either `profileProviderSettings` or shorthands.
 */
export type ProfileProviderEntry = UriPath | ProfileProviderSettings;

/**
 * Expanded profile settings for one profile id.
 */
export type ProfileSettings = {
  priority?: string[] | undefined;
  defaults?: UsecaseDefaults | undefined;
  providers?:
    | { [provider: string]: UriPath | ProfileProviderEntry }
    | undefined;
} & (
  | {
      version: SemanticVersion;
    }
  | {
      file: string;
    }
);

export type NormalizedProfileSettings = {
  priority: string[];
  defaults: NormalizedUsecaseDefaults;
  providers: { [provider: string]: NormalizedProfileProviderSettings };
} & (
  | {
      version: SemanticVersion;
    }
  | {
      file: string;
      priority: string[];
      defaults: NormalizedUsecaseDefaults;
      providers: { [provider: string]: NormalizedProfileProviderSettings };
    }
);

/**
 * Profile entry containing either `profileSettings` or shorthands.
 */
export type ProfileEntry = SemanticVersion | UriPath | ProfileSettings;

export type IdBase = {
  id: string;
};

export type ApiKeySecurityValues = IdBase & {
  apikey: string;
};

export type BasicAuthSecurityValues = IdBase & {
  username: string;
  password: string;
};

export type BearerTokenSecurityValues = IdBase & {
  token: string;
};

export type DigestSecurityValues = IdBase & {
  username: string;
  password: string;
};

export enum OAuthTokenType {
  BEARER = 'Bearer',
  //TODO: mac
}

export type OAuthSecurityValues = IdBase & {
  clientId: string;
  clientSecret: string;
  //TODO: refresh token is required only for now - make optional when we are able to do entire flow
  refreshToken: string;
  accessToken?: string;
  tokenType?: OAuthTokenType;
};

/**
 * Authorization variables.
 */
export type SecurityValues =
  | ApiKeySecurityValues
  | BasicAuthSecurityValues
  | BearerTokenSecurityValues
  | DigestSecurityValues
  | OAuthSecurityValues;

/**
 * Expanded provider settings for one provider name.
 */
export type ProviderSettings = {
  file?: string | undefined;
  security?: SecurityValues[] | undefined;
  parameters?: { [key: string]: string } | undefined;
};

export type NormalizedProviderSettings = {
  file?: string | undefined;
  security: SecurityValues[];
  parameters: { [key: string]: string };
};

export type ProviderEntry = UriPath | ProviderSettings;

export type SuperJsonDocument = {
  profiles?: { [profile: string]: ProfileEntry } | undefined;
  providers?: { [provider: string]: ProviderEntry } | undefined;
};

export type NormalizedSuperJsonDocument = {
  profiles: { [profile: string]: NormalizedProfileSettings };
  providers: { [provider: string]: NormalizedProviderSettings };
};

export type AnonymizedSuperJsonDocument = {
  profiles: Record<
    string,
    {
      version: SemanticVersion | 'file';
      providers: {
        provider: string;
        priority?: number | undefined;
        version: SemanticVersion | 'file';
      }[];
    }
  >;
  providers: string[];
};
