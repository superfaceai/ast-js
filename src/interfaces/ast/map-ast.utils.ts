import {
  AssignmentNode,
  CallStatementNode,
  ConditionAtomNode,
  HttpCallStatementNode,
  HttpRequestNode,
  HttpResponseHandlerNode,
  InlineCallNode,
  IterationAtomNode,
  JessieExpressionNode,
  MapASTNode,
  MapDefinitionNode,
  MapDocumentNode,
  MapHeaderNode,
  ObjectLiteralNode,
  OperationDefinitionNode,
  OutcomeStatementNode,
  PrimitiveLiteralNode,
  SetStatementNode,
} from './map-ast';

export function isOutcomeStatementNode(
  node: MapASTNode
): node is OutcomeStatementNode {
  return node.kind === 'OutcomeStatement';
}

export function isOperationDefinitionNode(
  node: MapASTNode
): node is OperationDefinitionNode {
  return node.kind === 'OperationDefinition';
}

export function isSetStatementNode(node: MapASTNode): node is SetStatementNode {
  return node.kind === 'SetStatement';
}

export function isMapHeaderNode(node: MapASTNode): node is MapHeaderNode {
  return node.kind === 'MapHeader';
}

export function isMapDefinitionNode(
  node: MapASTNode
): node is MapDefinitionNode {
  return node.kind === 'MapDefinition';
}

export function isMapDocumentNode(node: MapASTNode): node is MapDocumentNode {
  return node.kind === 'MapDocument';
}

export function isPrimitiveLiteralNode(
  node: MapASTNode
): node is PrimitiveLiteralNode {
  return node.kind === 'PrimitiveLiteral';
}

export function isObjectLiteralNode(
  node: MapASTNode
): node is ObjectLiteralNode {
  return node.kind === 'ObjectLiteral';
}

export function isJessieExpressionNode(
  node: MapASTNode
): node is JessieExpressionNode {
  return node.kind === 'JessieExpression';
}

export function isAssignmentNode(node: MapASTNode): node is AssignmentNode {
  return node.kind === 'Assignment';
}

export function isConditionAtomNode(
  node: MapASTNode
): node is ConditionAtomNode {
  return node.kind === 'ConditionAtom';
}

export function isIterationAtomNode(
  node: MapASTNode
): node is IterationAtomNode {
  return node.kind === 'IterationAtom';
}

export function isCallStatementNode(
  node: MapASTNode
): node is CallStatementNode {
  return node.kind === 'CallStatement';
}

export function isHttpRequestNode(node: MapASTNode): node is HttpRequestNode {
  return node.kind === 'HttpRequest';
}

export function isHttpResponseHandlerNode(
  node: MapASTNode
): node is HttpResponseHandlerNode {
  return node.kind === 'HttpResponseHandler';
}

export function isHttpCallStatementNode(
  node: MapASTNode
): node is HttpCallStatementNode {
  return node.kind === 'HttpCallStatement';
}

export function isInlineCallNode(node: MapASTNode): node is InlineCallNode {
  return node.kind === 'InlineCall';
}

export interface MapAstVisitor<R = unknown> {
  visit(node: MapASTNode): R;

  visitPrimitiveLiteralNode(node: PrimitiveLiteralNode): R;
  visitObjectLiteralNode(node: ObjectLiteralNode): R;
  visitJessieExpressionNode(node: JessieExpressionNode): R;
  visitAssignmentNode(node: AssignmentNode): R;
  visitConditionAtomNode(node: ConditionAtomNode): R;
  visitIterationAtomNode(node: IterationAtomNode): R;
  visitSetStatementNode(node: SetStatementNode): R;
  visitCallStatementNode(node: CallStatementNode): R;
  visitHttpResponseHandlerNode(node: HttpResponseHandlerNode): R;
  visitHttpCallStatementNode(node: HttpCallStatementNode): R;
  visitMapDefinitionNode(node: MapDefinitionNode): R;
  visitMapHeaderNode(node: MapHeaderNode): R;
  visitOperationDefinitionNode(node: OperationDefinitionNode): R;
  visitOutcomeStatementNode(node: OutcomeStatementNode): R;
  visitInlineCallNode(node: InlineCallNode): R;
  visitMapDocumentNode(node: MapDocumentNode): R;
}
