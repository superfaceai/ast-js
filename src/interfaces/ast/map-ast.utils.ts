import { prepareAssert } from '../../validation';
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
import * as schema from './map-ast.schema.json';
import { Assert } from './utils';

const assertMapDocument: Assert<MapDocumentNode> = prepareAssert(
  schema,
  'map-ast'
);

// We don't need to do JSON Schema validation on these, as they should be already validated
export const isAssignmentNode = (node: MapASTNode): node is AssignmentNode =>
  node.kind === 'Assignment';
export const isCallStatementNode = (
  node: MapASTNode
): node is CallStatementNode => node.kind === 'CallStatement';
export const isConditionAtomNode = (
  node: MapASTNode
): node is ConditionAtomNode => node.kind === 'ConditionAtom';
export const isHttpCallStatementNode = (
  node: MapASTNode
): node is HttpCallStatementNode => node.kind === 'HttpCallStatement';
export const isHttpRequestNode = (node: MapASTNode): node is HttpRequestNode =>
  node.kind === 'HttpRequest';
export const isHttpResponseHandlerNode = (
  node: MapASTNode
): node is HttpResponseHandlerNode => node.kind === 'HttpResponseHandler';
export const isInlineCallNode = (node: MapASTNode): node is InlineCallNode =>
  node.kind === 'InlineCall';
export const isIterationAtomNode = (
  node: MapASTNode
): node is IterationAtomNode => node.kind === 'IterationAtom';
export const isJessieExpressionNode = (
  node: MapASTNode
): node is JessieExpressionNode => node.kind === 'JessieExpression';
export const isMapDefinitionNode = (
  node: MapASTNode
): node is MapDefinitionNode => node.kind === 'MapDefinition';
export const isMapDocumentNode = (node: MapASTNode): node is MapDocumentNode =>
  node.kind === 'MapDocument';
export const isMapHeaderNode = (node: MapASTNode): node is MapHeaderNode =>
  node.kind === 'MapHeader';
export const isObjectLiteralNode = (
  node: MapASTNode
): node is ObjectLiteralNode => node.kind === 'ObjectLiteral';
export const isOperationDefinitionNode = (
  node: MapASTNode
): node is OperationDefinitionNode => node.kind === 'OperationDefinition';
export const isOutcomeStatementNode = (
  node: MapASTNode
): node is OutcomeStatementNode => node.kind === 'OutcomeStatement';
export const isPrimitiveLiteralNode = (
  node: MapASTNode
): node is PrimitiveLiteralNode => node.kind === 'PrimitiveLiteral';
export const isSetStatementNode = (
  node: MapASTNode
): node is SetStatementNode => node.kind === 'SetStatement';

export function assertMapDocumentNode(node: unknown): MapDocumentNode {
  assertMapDocument(node);

  return node;
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
