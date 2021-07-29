import {
  extractVersion,
  extractVersionString,
  isValidDocumentName,
  isValidIdentifier,
  isValidVersionString,
  parseVersionNumber,
} from './utils';

describe('utils', () => {
  describe('when validating identifier', () => {
    it('validates identifier correctly', () => {
      expect(isValidIdentifier('')).toEqual(false);
      expect(isValidIdentifier('te-st')).toEqual(false);
      expect(isValidIdentifier('test')).toEqual(true);
      expect(isValidIdentifier('test90')).toEqual(true);
      expect(isValidIdentifier('te_st')).toEqual(true);
      expect(isValidIdentifier('Te_St')).toEqual(true);
    });
  });

  describe('when validating document name', () => {
    it('validates name correctly', () => {
      expect(isValidDocumentName('')).toEqual(false);
      expect(isValidDocumentName('test')).toEqual(true);
      expect(isValidDocumentName('test90')).toEqual(true);
      expect(isValidDocumentName('te-st')).toEqual(true);
      expect(isValidDocumentName('te_st')).toEqual(true);
    });
  });

  describe('when validating version stfing', () => {
    it('validates version correctly', () => {
      expect(isValidVersionString('')).toEqual(false);
      expect(isValidVersionString('test')).toEqual(false);
      expect(isValidVersionString('1.t.0')).toEqual(false);
      expect(isValidVersionString('1.0.t')).toEqual(false);
      expect(isValidVersionString('1')).toEqual(true);
      expect(isValidVersionString('1.0')).toEqual(true);
      expect(isValidVersionString('0.0.1')).toEqual(true);
      expect(isValidVersionString('1.0.0')).toEqual(true);
      expect(isValidVersionString('9.9.9')).toEqual(true);
      expect(isValidVersionString('1.0.0-label')).toEqual(true);
      expect(isValidVersionString('1.0.7-TesT')).toEqual(false);
      expect(isValidVersionString('1.0.0-t.t')).toEqual(false);
    });
  });

  describe('when extracting version string', () => {
    it('extracts version correctly', () => {
      expect(() => extractVersionString('')).toThrow(
        new Error(`Invalid empty version string`)
      );
      expect(() => extractVersionString('@')).toThrow(
        new Error(`Invalid version string in "@"`)
      );
      expect(() => extractVersionString('test@test')).toThrow(
        new Error(`Invalid version string in "test@test"`)
      );
      expect(() => extractVersionString('test@1.t.0')).toThrow(
        new Error(`Invalid version string in "test@1.t.0"`)
      );
      expect(() => extractVersionString('1,23@1.0.t')).toThrow(
        new Error(`Invalid version string in "1,23@1.0.t"`)
      );
      expect(extractVersionString('1.2@1.0')).toEqual('1.0');
      expect(extractVersionString('test@0.0.1')).toEqual('0.0.1');
      expect(extractVersionString('@1.0.0')).toEqual('1.0.0');
      expect(extractVersionString('+:@9.9.9')).toEqual('9.9.9');
      expect(extractVersionString(' @1.0.0-label')).toEqual('1.0.0-label');
      expect(() => extractVersionString('test@1.0.7-TesT')).toThrow(
        new Error(`Invalid version string in "test@1.0.7-TesT"`)
      );
      expect(() => extractVersionString('test@1.0.0-t.t')).toThrow(
        new Error(`Invalid version string in "test@1.0.0-t.t"`)
      );
    });
  });

  describe('when parsing version stfing', () => {
    it('parses version correctly', () => {
      expect(() => parseVersionNumber('')).toThrow(
        new Error(`Unable to parse version string ""`)
      );
      expect(() => parseVersionNumber('@')).toThrow(
        new Error(`Unable to parse version string "@"`)
      );
      expect(() => parseVersionNumber('T')).toThrow(
        new Error(`Unable to parse version string "T"`)
      );
      expect(() => parseVersionNumber('0T')).toThrow(
        new Error(`Unable to parse version string "0T"`)
      );
      expect(parseVersionNumber('99')).toEqual(99);
      expect(parseVersionNumber('1')).toEqual(1);
      expect(parseVersionNumber(' 8')).toEqual(8);
      expect(parseVersionNumber('7 ')).toEqual(7);
      expect(parseVersionNumber('0')).toEqual(0);
    });
  });

  describe('when extracting version object', () => {
    it('extracts version correctly', () => {
      expect(() => extractVersion('')).toThrow(
        new Error(`Unable to parse version string ""`)
      );
      expect(() => extractVersion('@')).toThrow(
        new Error(`Unable to parse version string "@"`)
      );
      expect(() => extractVersion('1.E.6')).toThrow(
        new Error(`Unable to parse version string "E"`)
      );
      expect(() => extractVersion('E.!.1')).toThrow(
        new Error(`Unable to parse version string "E"`)
      );
      expect(() => extractVersion('1.0.t')).toThrow(
        new Error(`Unable to parse version string "t"`)
      );
      expect(() => extractVersion('1.')).toThrow(
        new Error(`Unable to parse version string ""`)
      );
      expect(() => extractVersion('1.0.0-!ab3l')).toThrow(
        new Error(`Invalid version label "!ab3l"`)
      );
      expect(() => extractVersion('1.0.0-Lab3l')).toThrow(
        new Error(`Invalid version label "Lab3l"`)
      );

      expect(extractVersion('1')).toEqual({ major: 1 });
      expect(extractVersion('1.0')).toEqual({ major: 1, minor: 0 });
      expect(extractVersion('0.0.1')).toEqual({ major: 0, minor: 0, patch: 1 });
      expect(extractVersion('1.0.0')).toEqual({ major: 1, minor: 0, patch: 0 });
      expect(extractVersion('9.9.9')).toEqual({ major: 9, minor: 9, patch: 9 });
      expect(extractVersion('1.0.0-label')).toEqual({
        major: 1,
        minor: 0,
        patch: 0,
        label: 'label',
      });
      expect(extractVersion('1.0.0-lab3l')).toEqual({
        major: 1,
        minor: 0,
        patch: 0,
        label: 'lab3l',
      });
      expect(extractVersion('1.0.0-la-b3l')).toEqual({
        major: 1,
        minor: 0,
        patch: 0,
        label: 'la-b3l',
      });
      expect(extractVersion('1.0.0-lab3l')).toEqual({
        major: 1,
        minor: 0,
        patch: 0,
        label: 'lab3l',
      });
      expect(extractVersion('1.0.0-la_b3l')).toEqual({
        major: 1,
        minor: 0,
        patch: 0,
        label: 'la_b3l',
      });
    });
  });
});
