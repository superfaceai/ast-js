export const EXTENSIONS = {
  profile: {
    source: '.supr',
    build: '.supr.ast.json',
  },
  map: {
    source: '.suma',
    build: '.suma.ast.json',
  },
};

export const enum DocumentType {
  UNKNOWN = 'unknown',
  MAP = 'map',
  PROFILE = 'profile',
  MAP_AST = 'map.ast',
  PROFILE_AST = 'profile.ast',
}

/**
 * Detects whether the file on path is Superface Map or Superface Profile based on the extension.
 */
export function inferDocumentType(path: string): DocumentType {
  const normalizedPath = path.toLowerCase().trim();
  if (normalizedPath.endsWith(EXTENSIONS.map.source)) {
    return DocumentType.MAP;
  }
  if (normalizedPath.endsWith(EXTENSIONS.profile.source)) {
    return DocumentType.PROFILE;
  }
  if (normalizedPath.endsWith(EXTENSIONS.map.build)) {
    return DocumentType.MAP_AST;
  }
  if (normalizedPath.endsWith(EXTENSIONS.profile.build)) {
    return DocumentType.PROFILE_AST;
  }

  return DocumentType.UNKNOWN;
}

/**
 * Checks whether the file is a Profile source file
 **/
export function isProfileFile(file: string): boolean {
  return inferDocumentType(file) === DocumentType.PROFILE;
}

/**
 * Checks whether the file is a compiled Profile file
 **/
export function isProfileASTFile(file: string): boolean {
  return inferDocumentType(file) === DocumentType.PROFILE_AST;
}

/**
 * Checks whether the file is a Map source file
 **/
export function isMapFile(file: string): boolean {
  return inferDocumentType(file) === DocumentType.MAP;
}

/**
 * Checks whether the file is a compiled Map file
 **/
export function isMapASTFile(file: string): boolean {
  return inferDocumentType(file) === DocumentType.MAP_AST;
}

/**
 * Checks whether the file is neither map nor profile file
 **/
export function isUnknownFile(file: string): boolean {
  return inferDocumentType(file) === DocumentType.UNKNOWN;
}
