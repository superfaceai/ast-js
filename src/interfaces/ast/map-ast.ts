import { Location } from './location';

export type MapNodeKind =
  | 'EvalDefinition'
  | 'HTTPOperationDefinition'
  | 'IterationDefinition'
  | 'JSExpression'
  | 'Map'
  | 'MapDefinition'
  | 'MapDocument'
  | 'MapExpressionsDefinition'
  | 'NetworkOperationDefinition'
  | 'OperationCallDefinition'
  | 'OperationDefinition'
  | 'OutcomeDefinition'
  | 'ProfileId'
  | 'Provider'
  | 'StepDefinition'
  | 'VariableExpressionsDefinition';

export interface MapASTNodeBase {
  kind: MapNodeKind;
  loc?: Location;
}

export interface JSExpressionNode extends MapASTNodeBase {
  kind: 'JSExpression';
  expression: string;
  source?: string;
  sourceMap?: string;
}

export interface MapExpressionDefinitionNode extends MapASTNodeBase {
  kind: 'MapExpressionsDefinition';
  left: string;
  right: JSExpressionNode;
}

export interface VariableExpressionDefinitionNode extends MapASTNodeBase {
  kind: 'VariableExpressionsDefinition';
  left: string;
  right: JSExpressionNode;
}

export interface OutcomeDefinitionNode extends MapASTNodeBase {
  kind: 'OutcomeDefinition';
  resultDefinition?: MapExpressionDefinitionNode[];
  returnDefinition?: MapExpressionDefinitionNode[];
  setDefinition?: VariableExpressionDefinitionNode[];
}

export interface EvalDefinitionNode extends MapASTNodeBase {
  kind: 'EvalDefinition';
  outcomeDefinition: OutcomeDefinitionNode;
}

export interface HTTPOperationDefinitionNode extends MapASTNodeBase {
  kind: 'HTTPOperationDefinition';
  method: string;
  url: string;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  requestDefinition: {
    security: 'basic' | 'bearer' | 'other';
    headers: VariableExpressionDefinitionNode[];
    body: MapExpressionDefinitionNode[];
    queryParametersDefinition: VariableExpressionDefinitionNode[];
  };
  responseDefinition: {
    statusCode: number;
    contentType: string;
    contentLanguage: string;
    outcomeDefinition: OutcomeDefinitionNode;
  };
}

export interface NetworkOperationDefinitionNode extends MapASTNodeBase {
  kind: 'NetworkOperationDefinition';
  definition: HTTPOperationDefinitionNode;
}

export interface OperationCallDefinitionNode extends MapASTNodeBase {
  kind: 'OperationCallDefinition';
  operationName: string;
  arguments: VariableExpressionDefinitionNode[];
  successOutcomeDefinition: OutcomeDefinitionNode;
}

export interface IterationDefinitionNode extends MapASTNodeBase {
  kind: 'IterationDefinition';
}

export interface StepDefinitionNode extends MapASTNodeBase {
  kind: 'StepDefinition';
  stepName: string;
  condition: JSExpressionNode;
  iterationDefinition?: IterationDefinitionNode;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  run:
    | EvalDefinitionNode
    | NetworkOperationDefinitionNode
    | OperationCallDefinitionNode;
}

export interface OperationDefinitionNode extends MapASTNodeBase {
  kind: 'OperationDefinition';
  operationName: string;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  stepsDefinition: StepDefinitionNode[];
}

export interface MapProfileIdNode extends MapASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}

export interface ProviderNode extends MapASTNodeBase {
  kind: 'Provider';
  providerId: string;
}

export interface MapNode extends MapASTNodeBase {
  kind: 'Map';
  profileId: MapProfileIdNode;
  provider: ProviderNode;
}

export interface MapDefinitionNode extends MapASTNodeBase {
  kind: 'MapDefinition';
  mapName: string;
  usecaseName: string;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  stepsDefinition: StepDefinitionNode[];
}

export interface MapDocumentNode extends MapASTNodeBase {
  kind: 'MapDocument';
  map: MapNode;
  definitions: (MapDefinitionNode | OperationDefinitionNode)[];
}

export type MapASTNode =
  | EvalDefinitionNode
  | HTTPOperationDefinitionNode
  | IterationDefinitionNode
  | JSExpressionNode
  | MapDefinitionNode
  | MapDocumentNode
  | MapExpressionDefinitionNode
  | MapNode
  | NetworkOperationDefinitionNode
  | OperationCallDefinitionNode
  | OperationDefinitionNode
  | OutcomeDefinitionNode
  | MapProfileIdNode
  | ProviderNode
  | StepDefinitionNode
  | VariableExpressionDefinitionNode;
