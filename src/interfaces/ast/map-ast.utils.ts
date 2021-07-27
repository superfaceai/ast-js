import { createIs } from 'typescript-is';

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
import { Guard } from './utils';

export const isAssignmentNode: Guard<AssignmentNode> = createIs<
  AssignmentNode
>();
export const isCallStatementNode: Guard<CallStatementNode> = createIs<
  CallStatementNode
>();
export const isConditionAtomNode: Guard<ConditionAtomNode> = createIs<
  ConditionAtomNode
>();
export const isHttpCallStatementNode: Guard<HttpCallStatementNode> = createIs<
  HttpCallStatementNode
>();
export const isHttpRequestNode: Guard<HttpRequestNode> = createIs<
  HttpRequestNode
>();
export const isHttpResponseHandlerNode: Guard<HttpResponseHandlerNode> = createIs<
  HttpResponseHandlerNode
>();
export const isInlineCallNode: Guard<InlineCallNode> = createIs<
  InlineCallNode
>();
export const isIterationAtomNode: Guard<IterationAtomNode> = createIs<
  IterationAtomNode
>();
export const isJessieExpressionNode: Guard<JessieExpressionNode> = createIs<
  JessieExpressionNode
>();
export const isMapASTNode: Guard<MapASTNode> = createIs<MapASTNode>();
export const isMapDefinitionNode: Guard<MapDefinitionNode> = createIs<
  MapDefinitionNode
>();
export const isMapDocumentNode: Guard<MapDocumentNode> = createIs<
  MapDocumentNode
>();
export const isMapHeaderNode: Guard<MapHeaderNode> = createIs<MapHeaderNode>();
export const isObjectLiteralNode: Guard<ObjectLiteralNode> = createIs<
  ObjectLiteralNode
>();
export const isOperationDefinitionNode: Guard<OperationDefinitionNode> = createIs<
  OperationDefinitionNode
>();
export const isOutcomeStatementNode: Guard<OutcomeStatementNode> = createIs<
  OutcomeStatementNode
>();
export const isPrimitiveLiteralNode: Guard<PrimitiveLiteralNode> = createIs<
  PrimitiveLiteralNode
>();
export const isSetStatementNode: Guard<SetStatementNode> = createIs<
  SetStatementNode
>();

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
