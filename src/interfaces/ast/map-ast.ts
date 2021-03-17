import { Location, Span } from './source';

export type MapNodeKind =
  // ATOMS
  | 'PrimitiveLiteral'
  | 'ObjectLiteral'
  | 'JessieExpression'
  | 'InlineCall'
  | 'Assignment'
  | 'StatementCondition'
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
 * Inline call, can appear on rhs in assignment.
 */
export interface InlineCallNode extends MapASTNodeBase {
  kind: 'InlineCall';
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
export interface StatementConditionNode extends MapASTNodeBase {
  kind: 'StatementCondition';
  expression: JessieExpressionNode;
}

// STATEMENTS

/**
 * Outcome node, specifying what value to return and whether to terminate the flow immediately:
 * `return/fail <?condition> <value>`
 * `map result/error <?condition> <value>`
 */
export interface OutcomeStatementNode extends MapASTNodeBase {
  kind: 'OutcomeStatement';
  condition?: StatementConditionNode;
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
  condition?: StatementConditionNode;
  assignments: AssignmentNode[];
}

/**
 * Call statement, possibly with a condition: `call <op>(<...args>) <?condition> { <...statements> }`
 */
export interface CallStatementNode extends MapASTNodeBase {
  kind: 'CallStatement';
  condition?: StatementConditionNode;
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
  statusCode?: number;
  contentType?: string;
  contentLanguage?: string;
  statements: (SetStatementNode | OutcomeStatementNode)[];
}

export interface HttpCallStatementNode extends MapASTNodeBase {
  kind: 'HttpCallStatement';
  method: string;
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
  name: string;
  usecaseName: string;
  statements: Substatement[];
}

export interface OperationDefinitionNode extends MapASTNodeBase {
  kind: 'OperationDefinition';
  name: string;
  statements: Substatement[];
}

// DOCUMENT

export interface MapHeaderNode extends MapASTNodeBase {
  kind: 'MapHeader';
  profile: {
    scope?: string;
    name: string;
    version: {
      major: number;
      minor: number;
      patch: number;
    };
  };
  provider: string;
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
  | StatementConditionNode
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
