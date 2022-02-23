import { isOAuthSecurityValues } from '.';
import {
  assertSuperJsonDocument,
  isApiKeySecurityValues,
  isBasicAuthSecurityValues,
  isBearerTokenSecurityValues,
  isDigestSecurityValues,
  isFileURIString,
  isVersionString,
} from './superjson.utils';

describe('super.json utils', () => {
  describe('assertSuperJsonDocument', () => {
    it('should not throw on valid SuperJsonDocument', () => {
      const superjson = {
        profiles: {
          'send-message': {
            version: '1.0.0',
            providers: {
              acme: {
                defaults: {
                  SomeUsecase: {
                    input: {
                      some: 'input',
                    },
                  },
                },
                mapVariant: 'my-bugfix',
                mapRevision: '1113',
              },
            },
          },
        },
        providers: {
          acme: {
            security: [
              {
                id: 'myApiKey',
                apikey: 'SECRET',
              },
            ],
          },
        },
      };
      expect(() => assertSuperJsonDocument(superjson)).not.toThrow();
    });

    it('should throw on invalid SuperJsonDocument', () => {
      const superjson = {
        profiles: {
          'send-message': {
            version: '1.0.0',
            providers: {
              acme: {
                defaults: {
                  bla: {
                    inputs: {
                      bla: 'bla',
                    },
                  },
                },
                mapVariant: 'my-bugfix',
                mapRevision: '1113',
              },
            },
          },
        },
        providers: {
          acme: {
            security: [
              {
                id: 'myApiKey',
                apikey: 'SECRET',
              },
            ],
          },
        },
        in: 'valid',
      };
      expect(() => assertSuperJsonDocument(superjson)).toThrow(
        '$: must not have additional property "in"'
      );
    });
  });

  describe('isVersionString', () => {
    it.each(['1.0.0', '0.0.1-beta.0', '1.2.3-alpha', '1.0.0-alpha+1'])(
      'should return true on valid semver string: %s',
      semver => {
        expect(isVersionString(semver)).toBe(true);
      }
    );

    it.each(['0', 'seven', '1.1', '0.0.0.0', 'v1.1.0'])(
      'should return false on invalid semver string: %s',
      notSemver => {
        expect(isVersionString(notSemver)).toBe(false);
      }
    );
  });

  describe('isFileURIString', () => {
    it('should return true on valid file URI string', () => {
      expect(isFileURIString('file://../some/path.json')).toBe(true);
    });

    it('should return false on invalid file URI string', () => {
      expect(isFileURIString('file:/some/path')).toBe(false);
      expect(
        isFileURIString('literally any string not starting with file://')
      ).toBe(false);
    });
  });

  describe('isApiKeySecurityValues', () => {
    it('should return true on valid values', () => {
      expect(
        isApiKeySecurityValues({ id: 'some-id', apikey: 'some-key' })
      ).toBe(true);
    });

    it('should return false on invalid values', () => {
      expect(isApiKeySecurityValues({ id: 7 })).toBe(false);
    });
  });

  describe('isBasicAuthSecurityValues', () => {
    it('should return true on valid values', () => {
      expect(
        isBasicAuthSecurityValues({
          id: 'some-id',
          username: 'some-user-name',
          password: 'some-password',
        })
      ).toBe(true);
    });

    it('should return false on invalid values', () => {
      expect(isBasicAuthSecurityValues({ id: 7 })).toBe(false);
    });
  });

  describe('isBearerTokenSecurityValues', () => {
    it('should return true on valid values', () => {
      expect(
        isBearerTokenSecurityValues({
          id: 'some-id',
          token: 'some-token',
        })
      ).toBe(true);
    });

    it('should return false on invalid values', () => {
      expect(isBearerTokenSecurityValues({ id: 7 })).toBe(false);
    });
  });

  describe('isDigestSecurityValues', () => {
    it('should return true on valid values', () => {
      expect(
        isDigestSecurityValues({
          id: 'some-id',
          username: 'some-user-name',
          password: 'some-password',
        })
      ).toBe(true);
    });

    it('should return false on invalid values', () => {
      expect(isDigestSecurityValues({ id: 7 })).toBe(false);
    });
  });

  describe('isOAuthSecurityValues', () => {
    it('should return true on valid values', () => {
      expect(
        isOAuthSecurityValues({
          id: 'some-id',
          clientId: 'id',
          clientSecret: 'secret',
          refreshToken: 'token',
        })
      ).toBe(true);
    });

    it('should return false on invalid values', () => {
      expect(isOAuthSecurityValues({ id: 7 })).toBe(false);
    });
  });
});
