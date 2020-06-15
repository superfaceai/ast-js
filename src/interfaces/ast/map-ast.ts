export type Kind =
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

export interface Location {
  start: number;
  end: number;
}

export interface ASTNodeBase {
  kind: Kind;
  loc?: Location;
}

export interface JSExpressionNode extends ASTNodeBase {
  kind: 'JSExpression';
  expression: string;
  source: string;
  sourceMap: string;
}

export interface MapExpressionDefinitionNode extends ASTNodeBase {
  kind: 'MapExpressionsDefinition';
  left: string;
  right: JSExpressionNode;
}

export interface VariableExpressionDefinitionNode extends ASTNodeBase {
  kind: 'VariableExpressionsDefinition';
  left: string;
  right: JSExpressionNode;
}

export interface OutcomeDefinitionNode extends ASTNodeBase {
  kind: 'OutcomeDefinition';
  resultDefinition?: MapExpressionDefinitionNode[];
  returnDefinition?: MapExpressionDefinitionNode[];
  setDefinition?: VariableExpressionDefinitionNode[];
}

export interface EvalDefinitionNode extends ASTNodeBase {
  kind: 'EvalDefinition';
  outcomeDefinition: OutcomeDefinitionNode;
}

export interface HTTPOperationDefinitionNode extends ASTNodeBase {
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
    statusCode: string;
    contentType: string;
    contentLanguage: string;
    outcomeDefinition: OutcomeDefinitionNode;
  };
}

export interface NetworkOperationDefinitionNode extends ASTNodeBase {
  kind: 'NetworkOperationDefinition';
  definition: HTTPOperationDefinitionNode;
}

export interface OperationCallDefinitionNode extends ASTNodeBase {
  kind: 'OperationCallDefinition';
  operationName: string;
  arguments: VariableExpressionDefinitionNode[];
  successOutcomeDefinition: OutcomeDefinitionNode;
}

export interface IterationDefinitionNode extends ASTNodeBase {
  kind: 'IterationDefinition';
}

export interface StepDefinitionNode extends ASTNodeBase {
  kind: 'StepDefinition';
  stepName: string;
  condition: JSExpressionNode;
  iterationDefinition: IterationDefinitionNode;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  run:
    | EvalDefinitionNode
    | NetworkOperationDefinitionNode
    | OperationCallDefinitionNode;
}

export interface OperationDefinitionNode extends ASTNodeBase {
  kind: 'OperationDefinition';
  operationName: string;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  stepsDefinition: StepDefinitionNode[];
}

export interface ProfileIdNode extends ASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}

export interface ProviderNode extends ASTNodeBase {
  kind: 'Provider';
  providerId: string;
}

export interface MapNode extends ASTNodeBase {
  kind: 'Map';
  profileId: ProfileIdNode;
  provider: ProviderNode;
}

export interface MapDefinitionNode extends ASTNodeBase {
  kind: 'MapDefinition';
  mapName: string;
  usecaseName: string;
  variableExpressionsDefinition: VariableExpressionDefinitionNode[];
  stepsDefinition: StepDefinitionNode[];
}

export interface MapDocumentNode extends ASTNodeBase {
  kind: 'MapDocument';
  map: MapNode;
  definitions: (MapDefinitionNode | OperationDefinitionNode)[];
}

export type ASTNode =
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
  | ProfileIdNode
  | ProviderNode
  | StepDefinitionNode
  | VariableExpressionDefinitionNode;
