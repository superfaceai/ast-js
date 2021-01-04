import {
  AssignmentNode,
  CallStatementNode,
  HttpCallStatementNode,
  HttpRequestNode,
  HttpResponseHandlerNode,
  InlineCallNode,
  JessieExpressionNode,
  MapASTNode,
  MapDefinitionNode,
  MapDocumentNode,
  MapNode,
  MapProfileIdNode,
  ObjectLiteralNode,
  OperationDefinitionNode,
  OutcomeStatementNode,
  PrimitiveLiteralNode,
  ProviderNode,
  SetStatementNode,
  StatementConditionNode,
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

export function isProviderNode(node: MapASTNode): node is ProviderNode {
  return node.kind === 'Provider';
}

export function isSetStatementNode(node: MapASTNode): node is SetStatementNode {
  return node.kind === 'SetStatement';
}

export function isMapNode(node: MapASTNode): node is MapNode {
  return node.kind === 'Map';
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

export function isStatementConditionNode(
  node: MapASTNode
): node is StatementConditionNode {
  return node.kind === 'StatementCondition';
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

export function isMapProfileIdNode(node: MapASTNode): node is MapProfileIdNode {
  return node.kind === 'ProfileId';
}

export function isInlineCallNode(node: MapASTNode): node is InlineCallNode {
  return node.kind === 'InlineCall';
}
