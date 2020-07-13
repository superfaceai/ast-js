/**
 * Human-readable location of a token inside source code.
 *
 * Both `line` and `column` are indexed from 1.
 */
export type Location = {
  line: number;
  column: number;
};

/**
 * Span of one node inside source code.
 */
export type Span = {
  start: number;
  end: number;
};
