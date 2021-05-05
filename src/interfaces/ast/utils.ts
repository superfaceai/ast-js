import { splitLimit } from './split';

export const IDENTIFIER_RE = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
export const DOCUMENT_NAME_RE = /^[a-z][a-z0-9_-]*$/;
export const PROVIDER_NAME_RE = /^[a-z][_\-0-9a-z]*$/;
export const VERSION_NUMBER_RE = /^[0-9]+$/;

export function isValidIdentifier(input: string): boolean {
  return IDENTIFIER_RE.test(input);
}

export function isValidDocumentName(input: string): boolean {
  return DOCUMENT_NAME_RE.test(input);
}

export function isValidProviderName(input: string): boolean {
  return PROVIDER_NAME_RE.test(input);
}

export function isValidVersionString(version: string): boolean {
  const [restVersion, label] = splitLimit(version, '-', 1);
  const [majorStr, minorStr, patchStr] = splitLimit(restVersion, '.', 2);

  if (!VERSION_NUMBER_RE.test(majorStr)) {
    return false;
  }
  if (minorStr !== undefined) {
    if (!VERSION_NUMBER_RE.test(minorStr)) {
      return false;
    }
  }
  if (patchStr !== undefined) {
    if (!VERSION_NUMBER_RE.test(patchStr)) {
      return false;
    }
  }
  if (label !== undefined) {
    if (!isValidDocumentName(label)) {
      return false;
    }
  }

  return true;
}
