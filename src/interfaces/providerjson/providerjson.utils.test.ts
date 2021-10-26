import { IntegrationParameter, prepareProviderParameters } from '.';
import {
  ApiKeyPlacement,
  HttpScheme,
  SecurityScheme,
  SecurityType,
} from './providerjson';
import {
  assertProviderJson,
  isApiKeySecurityScheme,
  isBasicAuthSecurityScheme,
  isBearerTokenSecurityScheme,
  isDigestSecurityScheme,
  isValidProviderName,
  prepareSecurityValues,
} from './providerjson.utils';

describe('ProviderJsonDocument', () => {
  it('parses valid provider.json', () => {
    {
      const providerJson = `{
        "name": "swapidev",
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "securitySchemes": [
            {
                "id": "swapidev",
                "type": "http",
                "scheme": "bearer"
            },
            {
                "id": "swapidev",
                "type": "apiKey",
                "in": "header",
                "name": "X-API-Key"
            },
            {
                "id": "swapidev",
                "type": "http",
                "scheme": "basic"
            }
        ],
        "defaultService": "swapidev",
        "parameters": [
          { "name": "userId", "description": "some user's id" }
        ]
      }`;
      expect(assertProviderJson(JSON.parse(providerJson))).toEqual({
        name: 'swapidev',
        services: [
          {
            id: 'swapidev',
            baseUrl: 'https://swapi.dev/api',
          },
        ],
        securitySchemes: [
          {
            id: 'swapidev',
            type: 'http',
            scheme: 'bearer',
          },
          {
            id: 'swapidev',
            type: 'apiKey',
            in: 'header',
            name: 'X-API-Key',
          },
          {
            id: 'swapidev',
            type: 'http',
            scheme: 'basic',
          },
        ],
        defaultService: 'swapidev',
        parameters: [{ name: 'userId', description: "some user's id" }],
      });
    }
    {
      const providerJson = `{
        "name": "swapidev",
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "securitySchemes": [],
        "defaultService": "swapidev"
      }`;
      expect(assertProviderJson(JSON.parse(providerJson))).toEqual({
        name: 'swapidev',
        services: [
          {
            id: 'swapidev',
            baseUrl: 'https://swapi.dev/api',
          },
        ],
        securitySchemes: [],
        defaultService: 'swapidev',
      });
    }
    {
      const providerJson = `{
        "name": "swapidev",
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "defaultService": "swapidev"
      }`;
      expect(assertProviderJson(JSON.parse(providerJson))).toEqual({
        name: 'swapidev',
        services: [
          {
            id: 'swapidev',
            baseUrl: 'https://swapi.dev/api',
          },
        ],
        defaultService: 'swapidev',
      });
    }

    {
      const providerJson = `{
        "name": "swapidev",
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "securitySchemes": [
            {
                "id": "swapidev",
                "type": "apiKey",
                "in": "header"
            }
        ],
        "defaultService": "swapidev"
      }`;
      expect(assertProviderJson(JSON.parse(providerJson))).toEqual({
        name: 'swapidev',
        services: [
          {
            id: 'swapidev',
            baseUrl: 'https://swapi.dev/api',
          },
        ],
        securitySchemes: [
          {
            id: 'swapidev',
            type: 'apiKey',
            in: 'header',
          },
        ],
        defaultService: 'swapidev',
      });
    }
  });

  it('throws error on document with missing name', () => {
    const providerJson = `{
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "defaultService": "swapidev"
      }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    })
      .toThrowError
      // new ZodError([
      //   {
      //     code: 'invalid_type',
      //     expected: 'string',
      //     received: 'undefined',
      //     path: ['name'],
      //     message: 'Required',
      //   },
      // ])
      ();
  });

  it('throws error on document with invalid name', () => {
    const providerJson = `{
        "name": "swapiDev",
        "services": [
            {
                "baseUrl": "https://swapi.dev/api",
                "id": "swapidev"
            }
        ],
        "defaultService": "swapidev"
      }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    })
      .toThrowError
      // new ZodError([
      //   {
      //     validation: 'regex',
      //     code: 'invalid_string',
      //     path: ['name'],
      //     message: 'Invalid',
      //   },
      // ])
      ();
  });

  it('throws error on document with missing services', () => {
    const providerJson = `{
        "name": "swapidev",
        "defaultService": "swapidev"
      }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    })
      .toThrowError
      // new ZodError([
      //   {
      //     code: 'invalid_type',
      //     expected: 'array',
      //     received: 'undefined',
      //     path: ['services'],
      //     message: 'Required',
      //   },
      // ])
      ();
  });

  it('throws error on document with missing property in services', () => {
    const providerJson = `{
        "name": "swapidev",
        "services": [
          {
              "id": "swapidev"
          }
        ],
        "defaultService": "swapidev"
      }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    })
      .toThrowError
      // new ZodError([
      //   {
      //     code: 'invalid_type',
      //     expected: 'string',
      //     received: 'undefined',
      //     path: ['services', 0, 'baseUrl'],
      //     message: 'Required',
      //   },
      // ])
      ();
  });

  it('throws error on document with missing defaultService', () => {
    const providerJson = `{
        "name": "swapidev",
        "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
        ]
      }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    })
      .toThrowError
      // new ZodError([
      //   {
      //     code: 'invalid_type',
      //     expected: 'string',
      //     received: 'undefined',
      //     path: ['defaultService'],
      //     message: 'Required',
      //   },
      // ])
      ();
  });

  it('throws error on document with missing id property in securitySchemes', () => {
    const providerJson = `{"name": "swapidev",
      "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
      ],
      "securitySchemes": [
          {
              "type": "http",
              "scheme": "bearer"
          }
      ],
      "defaultService": "swapidev"
    }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    }).toThrow();
  });

  it('throws error on document with missing type property in securitySchemes', () => {
    const providerJson = `{"name": "swapidev",
      "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
      ],
      "securitySchemes": [
          {
              "id": "swapidev",
              "scheme": "bearer"
          }
      ],
      "defaultService": "swapidev"
    }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    }).toThrow();
  });

  it('throws error on document with missing scheme property in securitySchemes', () => {
    const providerJson = `{"name": "swapidev",
      "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
      ],
      "securitySchemes": [
          {
              "id": "swapidev",
              "type": "http"
          }
      ],
      "defaultService": "swapidev"
    }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    }).toThrow();
  });

  it('throws error on document with missing in property in securitySchemes', () => {
    const providerJson = `{"name": "swapidev",
      "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
      ],
      "securitySchemes": [
          {
            "id": "swapidev",
            "type": "apiKey",
            "name": "X-API-Key"
          }
      ],
      "defaultService": "swapidev"
    }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    }).toThrow();
  });

  it('throws error on document with invalid parameters', () => {
    const providerJson = `{"name": "swapidev",
      "services": [
          {
              "baseUrl": "https://swapi.dev/api",
              "id": "swapidev"
          }
      ],
      "securitySchemes": [],
      "defaultService": "swapidev",
      "parameters": [
        { "name": "invalid name!!!!!"}
      ]
    }`;
    expect(() => {
      assertProviderJson(JSON.parse(providerJson));
    }).toThrow();
  });

  describe('ProviderJson type guards', () => {
    it('checks ApiTokenSecurity type correctly', () => {
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.HEADER,
            name: 'X-API-Key',
          })
        ).toEqual(true);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.BODY,
            name: 'X-API-Key',
          })
        ).toEqual(true);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.PATH,
            name: 'X-API-Key',
          })
        ).toEqual(true);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.QUERY,
            name: 'X-API-Key',
          })
        ).toEqual(true);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BEARER,
          })
        ).toEqual(false);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BASIC,
          })
        ).toEqual(false);
      }
      {
        expect(
          isApiKeySecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.DIGEST,
          })
        ).toEqual(false);
      }
    });

    it('checks BasicAuthSecurity type correctly', () => {
      {
        expect(
          isBasicAuthSecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.HEADER,
            name: 'X-API-Key',
          })
        ).toEqual(false);
      }
      {
        expect(
          isBasicAuthSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BEARER,
          })
        ).toEqual(false);
      }
      {
        expect(
          isBasicAuthSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BASIC,
          })
        ).toEqual(true);
      }
      {
        expect(
          isBasicAuthSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.DIGEST,
          })
        ).toEqual(false);
      }
    });

    it('checks BearerTokenSecurity type correctly', () => {
      {
        expect(
          isBearerTokenSecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.HEADER,
            name: 'X-API-Key',
          })
        ).toEqual(false);
      }
      {
        expect(
          isBearerTokenSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BEARER,
          })
        ).toEqual(true);
      }
      {
        expect(
          isBearerTokenSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BASIC,
          })
        ).toEqual(false);
      }
      {
        expect(
          isBearerTokenSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.DIGEST,
          })
        ).toEqual(false);
      }
    });

    it('checks DigestAuthSecurity type correctly', () => {
      {
        expect(
          isDigestSecurityScheme({
            id: 'swapidev',
            type: SecurityType.APIKEY,
            in: ApiKeyPlacement.HEADER,
            name: 'X-API-Key',
          })
        ).toEqual(false);
      }
      {
        expect(
          isDigestSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BEARER,
          })
        ).toEqual(false);
      }
      {
        expect(
          isDigestSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.BASIC,
          })
        ).toEqual(false);
      }
      {
        expect(
          isDigestSecurityScheme({
            id: 'swapidev',
            type: SecurityType.HTTP,
            scheme: HttpScheme.DIGEST,
          })
        ).toEqual(true);
      }
    });
  });
  describe('ProviderJson name check', () => {
    it('checks Provider name correctly', () => {
      expect(isValidProviderName('swapidev')).toEqual(true);
      expect(isValidProviderName('swapi-dev')).toEqual(true);
      expect(isValidProviderName('swapi_dev')).toEqual(true);
      expect(isValidProviderName('swapid90')).toEqual(false);
      expect(isValidProviderName('swapiDev')).toEqual(false);
      expect(isValidProviderName('Swapidev')).toEqual(false);
    });
  });
});

describe('prepareSecurityValues', () => {
  const providerName = 'test-provider';
  const mockSecuritySchemes: SecurityScheme[] = [
    {
      id: 'api',
      type: SecurityType.APIKEY,
      in: ApiKeyPlacement.HEADER,
      name: 'X-API-Key',
    },
    {
      id: 'bearer',
      type: SecurityType.HTTP,
      scheme: HttpScheme.BEARER,
    },
    {
      id: 'basic',
      type: SecurityType.HTTP,
      scheme: HttpScheme.BASIC,
    },
    {
      id: 'digest',
      type: SecurityType.HTTP,
      scheme: HttpScheme.DIGEST,
    },
  ];

  it('prepares security values', () => {
    expect(prepareSecurityValues(providerName, mockSecuritySchemes)).toEqual([
      {
        id: 'api',
        apikey: `$TEST_PROVIDER_API_KEY`,
      },
      {
        id: 'bearer',
        token: `$TEST_PROVIDER_TOKEN`,
      },
      {
        id: 'basic',
        username: `$TEST_PROVIDER_USERNAME`,
        password: `$TEST_PROVIDER_PASSWORD`,
      },
      {
        id: 'digest',
        digest: `$TEST_PROVIDER_DIGEST`,
      },
    ]);
  });

  it('does not prepare unknown security values', () => {
    const mockSecurityScheme = { id: 'unknown' };
    expect(
      prepareSecurityValues(providerName, [
        mockSecurityScheme as SecurityScheme,
      ])
    ).toEqual([]);
  });

  describe('prepareProviderParameters', () => {
    const mockProviderName = 'swapi';
    const mockParameters: IntegrationParameter[] = [
      {
        name: 'first',
        default: 'first-value',
        description: '1',
      },
      {
        name: 'second',
        description: '2',
      },
      {
        name: 'third',
      },
      {
        name: 'anothe-r-te-st',
      },
      {
        name: 'te_st',
      },
    ];

    it('prepares provider parameters', () => {
      expect(
        prepareProviderParameters(mockProviderName, mockParameters)
      ).toEqual({
        first: '$SWAPI_FIRST',
        second: '$SWAPI_SECOND',
        third: '$SWAPI_THIRD',
        ['anothe-r-te-st']: '$SWAPI_ANOTHE_R_TE_ST',
        ['te_st']: '$SWAPI_TE_ST',
      });
    });

    it('prepares empty provider parameters', () => {
      const mockParameters: IntegrationParameter[] = [];
      expect(
        prepareProviderParameters(mockProviderName, mockParameters)
      ).toEqual({});
    });
  });
});
