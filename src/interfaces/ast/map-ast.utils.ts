import {
  EvalDefinitionNode,
  HTTPOperationDefinitionNode,
  IterationDefinitionNode,
  JSExpressionNode,
  MapASTNode,
  MapDefinitionNode,
  MapDocumentNode,
  MapExpressionDefinitionNode,
  MapNode,
  MapProfileIdNode,
  NetworkOperationDefinitionNode,
  OperationCallDefinitionNode,
  OperationDefinitionNode,
  OutcomeDefinitionNode,
  ProviderNode,
  StepDefinitionNode,
  VariableExpressionDefinitionNode,
} from './map-ast';

function checkNode(node: MapASTNode, kind: MapASTNode['kind']): void {
  if (node.kind !== kind) {
    throw new Error(`Unexpected node: ${node.kind}, expected ${kind}`);
  }
}

export function assertIsJSExpression(
  node: MapASTNode
): asserts node is JSExpressionNode {
  checkNode(node, 'JSExpression');
}

export function assertIsMapExpressionDefinition(
  node: MapASTNode
): asserts node is MapExpressionDefinitionNode {
  checkNode(node, 'MapExpressionsDefinition');
}

export function assertIsVariableExpressionDefinitionNode(
  node: MapASTNode
): asserts node is VariableExpressionDefinitionNode {
  checkNode(node, 'VariableExpressionsDefinition');
}

export function assertIsOutcomeDefinitionNode(
  node: MapASTNode
): asserts node is OutcomeDefinitionNode {
  checkNode(node, 'OutcomeDefinition');
}

export function assertIsEvalDefinitionNode(
  node: MapASTNode
): asserts node is EvalDefinitionNode {
  checkNode(node, 'EvalDefinition');
}

export function assertIsHTTPOperationDefinitionNode(
  node: MapASTNode
): asserts node is HTTPOperationDefinitionNode {
  checkNode(node, 'HTTPOperationDefinition');
}

export function assertIsNetworkOperationDefinitionNode(
  node: MapASTNode
): asserts node is NetworkOperationDefinitionNode {
  checkNode(node, 'NetworkOperationDefinition');
}

export function assertIsOperationCallDefinitionNode(
  node: MapASTNode
): asserts node is OperationCallDefinitionNode {
  checkNode(node, 'OperationCallDefinition');
}

export function assertIsIterationDefinitionNode(
  node: MapASTNode
): asserts node is IterationDefinitionNode {
  checkNode(node, 'IterationDefinition');
}

export function assertIsStepDefinitionNode(
  node: MapASTNode
): asserts node is StepDefinitionNode {
  checkNode(node, 'StepDefinition');
}

export function assertIsOperationDefinitionNode(
  node: MapASTNode
): asserts node is OperationDefinitionNode {
  checkNode(node, 'OperationDefinition');
}

export function assertIsMapProfileIdNode(
  node: MapASTNode
): asserts node is MapProfileIdNode {
  checkNode(node, 'ProfileId');
}

export function assertIsProviderNode(
  node: MapASTNode
): asserts node is ProviderNode {
  checkNode(node, 'Provider');
}

export function assertIsMapNode(node: MapASTNode): asserts node is MapNode {
  checkNode(node, 'Map');
}

export function assertIsMapDefinitionNode(
  node: MapASTNode
): asserts node is MapDefinitionNode {
  checkNode(node, 'MapDefinition');
}

export function assertIsMapDocumentNode(
  node: MapASTNode
): asserts node is MapDocumentNode {
  checkNode(node, 'MapDocument');
}

export function isJSExpression(node: MapASTNode): node is JSExpressionNode {
  return node.kind === 'JSExpression';
}

export function isMapExpressionDefinition(
  node: MapASTNode
): node is MapExpressionDefinitionNode {
  return node.kind === 'MapExpressionsDefinition';
}

export function isVariableExpressionDefinitionNode(
  node: MapASTNode
): node is VariableExpressionDefinitionNode {
  return node.kind === 'VariableExpressionsDefinition';
}

export function isOutcomeDefinitionNode(
  node: MapASTNode
): node is OutcomeDefinitionNode {
  return node.kind === 'OutcomeDefinition';
}

export function isEvalDefinitionNode(
  node: MapASTNode
): node is EvalDefinitionNode {
  return node.kind === 'EvalDefinition';
}

export function isHTTPOperationDefinitionNode(
  node: MapASTNode
): node is HTTPOperationDefinitionNode {
  return node.kind === 'HTTPOperationDefinition';
}

export function isNetworkOperationDefinitionNode(
  node: MapASTNode
): node is NetworkOperationDefinitionNode {
  return node.kind === 'NetworkOperationDefinition';
}

export function isOperationCallDefinitionNode(
  node: MapASTNode
): node is OperationCallDefinitionNode {
  return node.kind === 'OperationCallDefinition';
}

export function isIterationDefinitionNode(
  node: MapASTNode
): node is IterationDefinitionNode {
  return node.kind === 'IterationDefinition';
}

export function isStepDefinitionNode(
  node: MapASTNode
): node is StepDefinitionNode {
  return node.kind === 'StepDefinition';
}

export function isOperationDefinitionNode(
  node: MapASTNode
): node is OperationDefinitionNode {
  return node.kind === 'OperationDefinition';
}

export function isProfileIdNode(node: MapASTNode): node is MapProfileIdNode {
  return node.kind === 'ProfileId';
}

export function isProviderNode(node: MapASTNode): node is ProviderNode {
  return node.kind === 'Provider';
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
