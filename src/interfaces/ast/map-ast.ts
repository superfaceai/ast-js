import { Location, Span } from './source';

export type MapNodeKind =
  // ATOMS
  | 'PrimitiveLiteral'
  | 'ObjectLiteral'
  | 'JessieExpression'
  | 'InlineCall'
  | 'Assignment'
  | 'ConditionAtom'
  | 'IterationAtom'
  // STATEMENTS
  | 'SetStatement'
  | 'OutcomeStatement'
  // CONTEXTUAL STATEMENTS
  | 'CallStatement'
  | 'HttpRequest'
  | 'HttpResponseHandler'
  | 'HttpCallStatement'
  // DEFINITIONS
  | 'MapDefinition'
  | 'OperationDefinition'
  // DOCUMENT
  | 'MapHeader'
  | 'MapDocument';

export interface MapASTNodeBase {
  kind: MapNodeKind;
  span?: Span;
  location?: Location;
}

// ATOMS

/**
 * Primitive literal atom like booleans, strings and numbers.
 */
export interface PrimitiveLiteralNode extends MapASTNodeBase {
  kind: 'PrimitiveLiteral';
  value: number | string | boolean;
}

/**
 * Object literal node: `{ <...assignments> }`
 */
export interface ObjectLiteralNode extends MapASTNodeBase {
  kind: 'ObjectLiteral';
  fields: AssignmentNode[];
}

export interface JessieExpressionNode extends MapASTNodeBase {
  kind: 'JessieExpression';
  expression: string;
  source?: string;
  sourceMap?: string;
}

/**
 * Inline call, can appear on rhs in assignment: `call <?iteration> <op>(<...args>) <?condition>`
 */
export interface InlineCallNode extends MapASTNodeBase {
  kind: 'InlineCall';
  condition?: ConditionAtomNode;
  iteration?: IterationAtomNode;
  operationName: string;
  arguments: AssignmentNode[];
}

export type LiteralNode =
  | ObjectLiteralNode
  | InlineCallNode
  | PrimitiveLiteralNode
  | JessieExpressionNode;

/**
 * Assignment node: `key."b.az".bar = <value>`
 */
export interface AssignmentNode extends MapASTNodeBase {
  kind: 'Assignment';
  key: string[];
  value: LiteralNode;
}

/**
 * Statement condition atom: `if (<jessie>)`
 */
export interface ConditionAtomNode extends MapASTNodeBase {
  kind: 'ConditionAtom';
  expression: JessieExpressionNode;
}

/**
 * Iteration atom: `foreach (<iterationVariable> of <iterable>)`
 */
export interface IterationAtomNode extends MapASTNodeBase {
  kind: 'IterationAtom';
  iterationVariable: string;
  iterable: JessieExpressionNode;
}

// STATEMENTS

/**
 * Outcome node, specifying what value to return and whether to terminate the flow immediately:
 * `return/fail <?condition> <value>`
 * `map result/error <?condition> <value>`
 */
export interface OutcomeStatementNode extends MapASTNodeBase {
  kind: 'OutcomeStatement';
  condition?: ConditionAtomNode;
  isError: boolean;
  terminateFlow: boolean;
  value: LiteralNode;
}

// SCOPING STATEMENTS

/**
 * Set statement, possibly with a condition: `set <?condition> { <...assignments> }`
 */
export interface SetStatementNode extends MapASTNodeBase {
  kind: 'SetStatement';
  condition?: ConditionAtomNode;
  assignments: AssignmentNode[];
}

/**
 * Call statement, possibly with a condition and iteration: `call <?iteration> <op>(<...args>) <?condition> { <...statements> }`
 */
export interface CallStatementNode extends MapASTNodeBase {
  kind: 'CallStatement';
  iteration?: IterationAtomNode;
  condition?: ConditionAtomNode;
  operationName: string;
  arguments: AssignmentNode[];
  statements: (SetStatementNode | OutcomeStatementNode)[];
}

export type HttpSecurityRequirement = {
  id: string;
  /** Optional scheme information. */
  scheme?: 'apikey' | 'basic' | 'bearer';
};

/**
 * Request definition for http:
 * `request <?contentType> <?contentLanguage> { <?query> <?headers? <?body> }`
 */
export interface HttpRequestNode extends MapASTNodeBase {
  kind: 'HttpRequest';
  contentType?: string;
  contentLanguage?: string;
  query?: ObjectLiteralNode;
  headers?: ObjectLiteralNode;
  body?: LiteralNode;
  security: HttpSecurityRequirement[];
}

/**
 * Response handler for http: `response <?statusCode> <?contentType> <?contentLanguage> { <...statements> }`
 */
export interface HttpResponseHandlerNode extends MapASTNodeBase {
  kind: 'HttpResponseHandler';
  /**
   * @TJS-type integer
   * @TJS-minimum 200
   * @TJS-maximum 599
   **/
  statusCode?: number;
  contentType?: string;
  contentLanguage?: string;
  statements: (SetStatementNode | OutcomeStatementNode)[];
}

export interface HttpCallStatementNode extends MapASTNodeBase {
  kind: 'HttpCallStatement';
  method: string;
  /**
   * @format uri
   **/
  url: string;
  request?: HttpRequestNode;
  responseHandlers: HttpResponseHandlerNode[];
}

// DEFINITIONS

export type Substatement =
  | SetStatementNode
  | OutcomeStatementNode
  | CallStatementNode
  | HttpCallStatementNode;

export interface MapDefinitionNode extends MapASTNodeBase {
  kind: 'MapDefinition';

  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   */
  name: string;
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   */
  usecaseName: string;
  statements: Substatement[];
}

export interface OperationDefinitionNode extends MapASTNodeBase {
  kind: 'OperationDefinition';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   */
  name: string;
  statements: Substatement[];
}

// DOCUMENT

export interface MapHeaderNode extends MapASTNodeBase {
  kind: 'MapHeader';
  profile: {
    /**
     * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
     **/
    scope?: string;
    /**
     * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
     **/
    name: string;
    version: {
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      major: number;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      minor: number;
      /**
       * @TJS-minimum 0
       * @TJS-type integer
       **/
      patch?: number;
      /**
       * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
       **/
      label?: string;
    };
  };

  /**
   * @pattern require("./utils.ts").DOCUMENT_NAME_RE_SOURCE
   **/
  provider: string;
  /**
   * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
   **/
  variant?: string;
}

export interface MapDocumentNode extends MapASTNodeBase {
  kind: 'MapDocument';
  header: MapHeaderNode;
  definitions: (MapDefinitionNode | OperationDefinitionNode)[];
}

export type MapASTNode =
  | PrimitiveLiteralNode
  | ObjectLiteralNode
  | JessieExpressionNode
  | AssignmentNode
  | ConditionAtomNode
  | IterationAtomNode
  | SetStatementNode
  | OutcomeStatementNode
  | CallStatementNode
  | HttpRequestNode
  | HttpResponseHandlerNode
  | HttpCallStatementNode
  | MapDefinitionNode
  | OperationDefinitionNode
  | MapHeaderNode
  | MapDocumentNode
  | InlineCallNode;
