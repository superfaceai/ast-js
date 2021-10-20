/**
 * Human-readable location of a token inside source code.
 *
 * Both `line` and `column` are indexed from 1.
 */
type Location = {
  line: number;
  column: number;
};

/**
 * Span of one node inside source code.
 */
type Span = {
  start: number;
  end: number;
};

/** Node preceded by documenting string literal */
export interface DocumentedNode {
  title?: string | undefined;
  description?: string | undefined;
}

/**
 * Information about AST and Parser used to compile provided AST
 */
export interface AstMetadata {
  astVersion: { major: number; minor: number; patch: number; label?: string };
  parserVersion: {
    major: number;
    minor: number;
    patch: number;
    label?: string;
  };
  checksum: string;
}

//TODO: not sure about optionality/ possible undefined value
export type LocationInfo = {
  span: Span;
  location: Location;
};
