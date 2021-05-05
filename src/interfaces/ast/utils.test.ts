import {
  isValidDocumentName,
  isValidIdentifier,
  isValidProviderName,
  isValidVersionString,
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

  describe('when validating provider name', () => {
    it('validates name correctly', () => {
      expect(isValidProviderName('')).toEqual(false);
      expect(isValidProviderName('test')).toEqual(true);
      expect(isValidProviderName('test90')).toEqual(true);
      expect(isValidProviderName('te-st')).toEqual(true);
      expect(isValidProviderName('te_st')).toEqual(true);
    });
  });

  describe('when validating version stfing', () => {
    it('validates version correctly', () => {
      expect(isValidVersionString('')).toEqual(false);
      expect(isValidVersionString('test')).toEqual(false);
      expect(isValidVersionString('1.t.0')).toEqual(false);
      expect(isValidVersionString('1.0.t')).toEqual(false);
      expect(isValidVersionString('1.0')).toEqual(true);
      expect(isValidVersionString('0.0.1')).toEqual(true);
      expect(isValidVersionString('1.0.0')).toEqual(true);
      expect(isValidVersionString('9.9.9')).toEqual(true);
      expect(isValidVersionString('1.0.0-label')).toEqual(true);
      expect(isValidVersionString('1.0.7-TesT')).toEqual(false);
      expect(isValidVersionString('1.0.0-t.t')).toEqual(false);
    });
  });
});
