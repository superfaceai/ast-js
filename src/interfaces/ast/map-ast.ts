import { Location, Span } from './source';

export type MapNodeKind =
 // ATOMS  
 | 'PrimitiveLiteral'
 | 'ArrayLiteral'
 | 'ObjectLiteral'
 | 'JessieExpression'
 | 'Assignment'
 | 'StatementCondition'
 // STATEMENTS
 | 'SetStatement'
 | 'ReturnStatement'
 | 'FailStatement'
 | 'MapResultStatement'
 | 'MapErrorStatement'
 // CONTEXTUAL STATEMENTS
 | 'CallStatement'
 | 'HttpResponseHandler'
 | 'HttpCallStatement'
 // DEFINITIONS
 | 'MapDefinition'
 | 'OperationDefinition'
 // DOCUMENT
 | 'ProfileId'
 | 'Provider'
 | 'Map'
 | 'MapDocument'
;

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
 * Array literal atom.
 */
export interface ArrayLiteralNode extends MapASTNodeBase {
  kind: 'ArrayLiteral';
  elements: LiteralNode[];
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

export type LiteralNode = ObjectLiteralNode | ArrayLiteralNode | PrimitiveLiteralNode | JessieExpressionNode;

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
 * Return statement, possibly with a condition: `return <?condition> <value>`
 */
export interface ReturnStatementNode extends MapASTNodeBase {
  kind: 'ReturnStatement';
  condition?: StatementConditionNode;
  value: LiteralNode;
}

/**
 * Fail statement, possibly with a condition: `fail <?condition> <value>`
 */
export interface FailStatementNode extends MapASTNodeBase {
  kind: 'FailStatement';
  condition?: StatementConditionNode;
  value: LiteralNode;
}

/**
 * Map result statement, possibly with a condition: `map result <?condition> <value>`
 */
export interface MapResultStatementNode extends MapASTNodeBase {
  kind: 'MapResultStatement';
  condition?: StatementConditionNode;
  value: LiteralNode;
}

/**
 * Map result statement, possibly with a condition: `map error <?condition> <value>`
 */
export interface MapErrorStatementNode extends MapASTNodeBase {
  kind: 'MapErrorStatement';
  condition?: StatementConditionNode;
  value: LiteralNode;
}

// SCOPING STATEMENTS

export type OperationSubstatement = FailStatementNode | ReturnStatementNode;
export type MapSubstatement = MapResultStatementNode | MapErrorStatementNode;
export type SubstatementType = OperationSubstatement | MapSubstatement;

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
export interface CallStatementNode<S extends SubstatementType> extends MapASTNodeBase {
  kind: 'CallStatement';
  condition?: StatementConditionNode;
  operationName: string;
  arguments: AssignmentNode[];
  statements: (SetStatementNode | S)[];
}

/**
 * Response handler for http: `response <statusCode> <contentType> <contentLanguage> { <...statements> }`
 */
export interface HttpResponseHandlerNode<S extends SubstatementType> extends MapASTNodeBase {
  kind: 'HttpResponseHandler';
  statusCode?: number;
  contentType?: string;
  contentLanguage?: string;
  statements: (SetStatementNode | S)[];
}

export interface HttpCallStatementNode<S extends SubstatementType> extends MapASTNodeBase {
  kind: 'HttpCallStatement';
  method: string;
  url: string;
  requestDefinition: {
    queryParameters?: ObjectLiteralNode;
    headers?: ObjectLiteralNode;
    body?: LiteralNode;
  };
  responseHandlers: HttpResponseHandlerNode<S>[];
}

// DEFINITIONS

export type MapStatement = SetStatementNode | MapResultStatementNode | MapErrorStatementNode | CallStatementNode<MapSubstatement> | HttpCallStatementNode<MapSubstatement>;

export interface MapDefinitionNode extends MapASTNodeBase {
  kind: 'MapDefinition';
  name: string;
  usecaseName: string;
  statements: MapStatement[];
}

export type OperationStatement = SetStatementNode | ReturnStatementNode | FailStatementNode | CallStatementNode<OperationSubstatement> | HttpCallStatementNode<OperationSubstatement>;

export interface OperationDefinitionNode extends MapASTNodeBase {
  kind: 'OperationDefinition';
  name: string;
  statements: OperationStatement[];
}

// DOCUMENT

/**
 * `profileId = <string>`
 */
export interface MapProfileIdNode extends MapASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}

/**
 * `provider = <string>`
 */
export interface ProviderNode extends MapASTNodeBase {
  kind: 'Provider';
  providerId: string;
}

export interface MapNode extends MapASTNodeBase {
  kind: 'Map';
  profileId: MapProfileIdNode;
  provider: ProviderNode;
}

export interface MapDocumentNode extends MapASTNodeBase {
  kind: 'MapDocument';
  map: MapNode;
  definitions: (MapDefinitionNode | OperationDefinitionNode)[];
}

export type MapASTNode =
 | PrimitiveLiteralNode
 | ArrayLiteralNode
 | ObjectLiteralNode
 | JessieExpressionNode
 | AssignmentNode
 | StatementConditionNode
 | SetStatementNode
 | ReturnStatementNode
 | FailStatementNode
 | MapResultStatementNode
 | MapErrorStatementNode
 | CallStatementNode<MapSubstatement>
 | CallStatementNode<OperationSubstatement>
 | HttpResponseHandlerNode<MapSubstatement>
 | HttpResponseHandlerNode<OperationSubstatement>
 | HttpCallStatementNode<MapSubstatement>
 | HttpCallStatementNode<OperationSubstatement>
 | MapDefinitionNode
 | OperationDefinitionNode
 | MapProfileIdNode
 | ProviderNode
 | MapNode
 | MapDocumentNode
;
