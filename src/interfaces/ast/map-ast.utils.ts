import { prepareAssert, preparePrepareIs } from '../../validation';
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
import { Assert, Guard } from './utils';

const prepareIs = preparePrepareIs(schema);
const assertEquals: Assert<MapDocumentNode> = prepareAssert(schema);

export const isAssignmentNode: Guard<AssignmentNode> =
  prepareIs<AssignmentNode>('#/definitions/AssignmentNode');
export const isCallStatementNode: Guard<CallStatementNode> =
  prepareIs<CallStatementNode>('#/definitions/CallStatementNode');
export const isConditionAtomNode: Guard<ConditionAtomNode> =
  prepareIs<ConditionAtomNode>('#/definitions/ConditionAtomNode');
export const isHttpCallStatementNode: Guard<HttpCallStatementNode> =
  prepareIs<HttpCallStatementNode>('#/definitions/HttpCallStatementNode');
export const isHttpRequestNode: Guard<HttpRequestNode> =
  prepareIs<HttpRequestNode>('#/definitions/HttpRequestNode');
export const isHttpResponseHandlerNode: Guard<HttpResponseHandlerNode> =
  prepareIs<HttpResponseHandlerNode>('#/definitions/HttpResponseHandlerNode');
export const isInlineCallNode: Guard<InlineCallNode> =
  prepareIs<InlineCallNode>('#/definitions/InlineCallNode');
export const isIterationAtomNode: Guard<IterationAtomNode> =
  prepareIs<IterationAtomNode>('#/definitions/IterationAtomNode');
export const isJessieExpressionNode: Guard<JessieExpressionNode> =
  prepareIs<JessieExpressionNode>('#/definitions/JessieExpressionNode');
export const isMapASTNode: Guard<MapASTNode> = prepareIs<MapASTNode>(
  '#/definitions/MapASTNode'
);
export const isMapDefinitionNode: Guard<MapDefinitionNode> =
  prepareIs<MapDefinitionNode>('#/definitions/MapDefinitionNode');
export const isMapDocumentNode: Guard<MapDocumentNode> =
  prepareIs<MapDocumentNode>('#/definitions/MapDocumentNode');
export const isMapHeaderNode: Guard<MapHeaderNode> = prepareIs<MapHeaderNode>(
  '#/definitions/MapHeaderNode'
);
export const isObjectLiteralNode: Guard<ObjectLiteralNode> =
  prepareIs<ObjectLiteralNode>('#/definitions/ObjectLiteralNode');
export const isOperationDefinitionNode: Guard<OperationDefinitionNode> =
  prepareIs<OperationDefinitionNode>('#/definitions/OperationDefinitionNode');
export const isOutcomeStatementNode: Guard<OutcomeStatementNode> =
  prepareIs<OutcomeStatementNode>('#/definitions/OutcomeStatementNode');
export const isPrimitiveLiteralNode: Guard<PrimitiveLiteralNode> =
  prepareIs<PrimitiveLiteralNode>('#/definitions/PrimitiveLiteralNode');
export const isSetStatementNode: Guard<SetStatementNode> =
  prepareIs<SetStatementNode>('#/definitions/SetStatementNode');

export function assertMapDocumentNode(node: unknown): MapDocumentNode {
  assertEquals(node);

  return node;
  // const assert = createAssertEquals<MapDocumentNode>();
  // try {
  //   return assert(node);
  // } catch (error) {
  //   if (error instanceof TypeGuardError) {
  //     throw new AssertionError(`Map AST ${error.message}`, error.path);
  //   }
  //   throw error;
  // }
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
