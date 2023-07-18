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
  SIMPLE = 'simple',
  CIRCUIT_BREAKER = 'circuit-breaker',
}

export enum BackoffKind {
  EXPONENTIAL = 'exponential',
}

export type BackoffPolicy =
  | BackoffKind.EXPONENTIAL
  | {
    kind: BackoffKind.EXPONENTIAL;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    start?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    factor?: number;
  };

/**
 * Retry policy configuration.
 */
export type RetryPolicy =
  | OnFail.NONE
  | {
    kind: OnFail.NONE;
  }
  | OnFail.SIMPLE
  | {
    kind: OnFail.SIMPLE;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    maxContiguousRetries?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    requestTimeout?: number;
  }
  | OnFail.CIRCUIT_BREAKER
  | {
    kind: OnFail.CIRCUIT_BREAKER;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    maxContiguousRetries?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    openTime?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    requestTimeout?: number;
    backoff?: BackoffPolicy;
  };

export type NormalizedBackoffPolicy = {
  kind: BackoffKind.EXPONENTIAL;
  /**
   * @TJS-minimum 0
   * @TJS-type integer
   **/
  start?: number;
  /**
   * @TJS-minimum 0
   * @TJS-type integer
   **/
  factor?: number;
};

export type NormalizedRetryPolicy =
  | {
    kind: OnFail.NONE;
  }
  | {
    kind: OnFail.SIMPLE;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    maxContiguousRetries?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    requestTimeout?: number;
  }
  | {
    kind: OnFail.CIRCUIT_BREAKER;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    maxContiguousRetries?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    openTime?: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    requestTimeout?: number;
    backoff: NormalizedBackoffPolicy;
  };

/**
 * Default per usecase values.
 */
export type UsecaseDefaults = {
  [usecase: string]: {
    input?: { [key: string]: unknown };
    providerFailover?: boolean;
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
    input?: { [key: string]: unknown };
    retryPolicy?: RetryPolicy;
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
  defaults?: ProfileProviderDefaults;
} & (
    | {
      file: string;
    }
    | {
      mapVariant?: string;
      mapRevision?: string;
    }
  );

export type NormalizedProfileProviderSettings =
  | {
    file: string;
    defaults: NormalizedProfileProviderDefaults;
  }
  | {
    mapVariant?: string;
    mapRevision?: string;
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
  priority?: string[];
  defaults?: UsecaseDefaults;
  providers?: { [provider: string]: UriPath | ProfileProviderEntry };
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

/**
 * @$id ApiKeySecurityValues
 **/
export type ApiKeySecurityValues = IdBase & {
  apikey: string;
};

/**
 * @$id BasicAuthSecurityValues
 **/
export type BasicAuthSecurityValues = IdBase & {
  username: string;
  password: string;
};

/**
 * @$id BearerTokenSecurityValues
 **/
export type BearerTokenSecurityValues = IdBase & {
  token: string;
};

/**
 * Authorization variables.
 */
export type SecurityValues =
  | ApiKeySecurityValues
  | BasicAuthSecurityValues
  | BearerTokenSecurityValues;

/**
 * Expanded provider settings for one provider name.
 */
export type ProviderSettings = {
  file?: string;
  security?: SecurityValues[];
  parameters?: { [key: string]: string };
};

export type NormalizedProviderSettings = {
  file?: string;
  security: SecurityValues[];
  parameters: { [key: string]: string };
};

export type ProviderEntry = UriPath | ProviderSettings;

export type SuperJsonDocument = {
  profiles?: { [profile: string]: ProfileEntry };
  providers?: { [provider: string]: ProviderEntry };
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
        priority?: number;
        version: SemanticVersion | 'file';
      }[];
    }
  >;
  providers: string[];
};
