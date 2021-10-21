/**
 * Location within the source.
 * 
 * Contains both the human-readable line:column information and character index.
 */
export type Location = {
  /** Line number - starts at 1 */
  line: number;
  /** Column number - starts at 1 */
  column: number;
  /** Character index within the source code - starts at 0 */
  charIndex: number;
};

/**
 * Location span within the source.
 */
export type LocationSpan = {
  start: Location;
  end: Location;
};


/** Node preceded by documenting string literal */
export interface DocumentedNode {
  documentation?:
    | {
        title: string;
        description?: string | undefined;
        location?: LocationSpan | undefined;
      }
    | undefined;
}

/**
 * Information about AST and Parser used to compile provided AST
 */
export interface AstMetadata {
  astVersion: {
    major: number;
    minor: number;
    patch: number;
    label?: string | undefined;
  };
  parserVersion: {
    major: number;
    minor: number;
    patch: number;
    label?: string | undefined;
  };
  sourceChecksum: string;
}
