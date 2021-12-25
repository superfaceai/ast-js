import {
  assertMapDocumentNode,
  AssignmentNode,
  CallStatementNode,
  ConditionAtomNode,
  HttpCallStatementNode,
  HttpRequestNode,
  HttpResponseHandlerNode,
  InlineCallNode,
  isAssignmentNode,
  isCallStatementNode,
  isConditionAtomNode,
  isHttpCallStatementNode,
  isHttpRequestNode,
  isHttpResponseHandlerNode,
  isInlineCallNode,
  isIterationAtomNode,
  isJessieExpressionNode,
  isMapDefinitionNode,
  isMapDocumentNode,
  isMapHeaderNode,
  isObjectLiteralNode,
  isOperationDefinitionNode,
  isOutcomeStatementNode,
  isPrimitiveLiteralNode,
  isSetStatementNode,
  IterationAtomNode,
  JessieExpressionNode,
  MapDefinitionNode,
  MapDocumentNode,
  MapHeaderNode,
  ObjectLiteralNode,
  OperationDefinitionNode,
  OutcomeStatementNode,
  PrimitiveLiteralNode,
  SetStatementNode,
} from '.';

describe('map-ast.utils', () => {
  describe('isOutcomeStatementNode', () => {
    it('checks if node is outcome statement node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isOutcomeStatementNode(outcomeNode)).toEqual(true);

      const operationNode: OperationDefinitionNode = {
        kind: 'OperationDefinition',
        name: 'test',
        statements: [],
      };
      expect(isOutcomeStatementNode(operationNode)).toEqual(false);
    });
  });

  describe('isOperationDefinitionNode', () => {
    it('checks if node is operation definition node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isOperationDefinitionNode(outcomeNode)).toEqual(false);

      const operationNode: OperationDefinitionNode = {
        kind: 'OperationDefinition',
        name: 'test',
        statements: [],
      };
      expect(isOperationDefinitionNode(operationNode)).toEqual(true);
    });
  });

  describe('isSetStatementNode', () => {
    it('checks if node is set statement node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isSetStatementNode(outcomeNode)).toEqual(false);

      const node: SetStatementNode = {
        kind: 'SetStatement',
        assignments: [],
      };
      expect(isSetStatementNode(node)).toEqual(true);
    });
  });

  describe('isMapHeaderNode', () => {
    it('checks if node is map header node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isMapHeaderNode(outcomeNode)).toEqual(false);

      const node: MapHeaderNode = {
        kind: 'MapHeader',
        profile: {
          name: 'test',
          version: {
            major: 1,
            minor: 0,
          },
        },
        provider: 'provider',
      };
      expect(isMapHeaderNode(node)).toEqual(true);
    });
  });

  describe('isMapDefinitionNode', () => {
    it('checks if node is map definition node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isMapDefinitionNode(outcomeNode)).toEqual(false);

      const node: MapDefinitionNode = {
        kind: 'MapDefinition',
        name: 'test',
        usecaseName: 'test',
        statements: [],
      };
      expect(isMapDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isMapDocumentNode', () => {
    it('checks if node is map definition node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isMapDocumentNode(outcomeNode)).toEqual(false);

      const node: MapDocumentNode = {
        kind: 'MapDocument',
        astMetadata: {
          astVersion: { major: 1, minor: 0, patch: 0 },
          parserVersion: { major: 1, minor: 0, patch: 0 },
          sourceChecksum: 'dsdds',
        },
        header: {
          kind: 'MapHeader',
          profile: {
            name: 'test',
            version: {
              major: 1,
              minor: 0,
            },
          },
          provider: 'provider',
        },
        definitions: [],
      };
      expect(isMapDocumentNode(node)).toEqual(true);
    });
  });

  describe('isPrimitiveLiteralNode', () => {
    it('checks if node is primitive literal node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isPrimitiveLiteralNode(outcomeNode)).toEqual(false);

      const node: PrimitiveLiteralNode = {
        kind: 'PrimitiveLiteral',
        value: 1,
      };
      expect(isPrimitiveLiteralNode(node)).toEqual(true);
    });
  });

  describe('isObjectLiteralNode', () => {
    it('checks if node is object literal node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isObjectLiteralNode(outcomeNode)).toEqual(false);

      const node: ObjectLiteralNode = {
        kind: 'ObjectLiteral',
        fields: [],
      };
      expect(isObjectLiteralNode(node)).toEqual(true);
    });
  });

  describe('isJessieExpressionNode', () => {
    it('checks if node is jessie expression node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isJessieExpressionNode(outcomeNode)).toEqual(false);

      const node: JessieExpressionNode = {
        kind: 'JessieExpression',
        expression: 'test',
      };
      expect(isJessieExpressionNode(node)).toEqual(true);
    });
  });

  describe('isAssignmentNode', () => {
    it('checks if node is assignment node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isAssignmentNode(outcomeNode)).toEqual(false);

      const node: AssignmentNode = {
        kind: 'Assignment',
        key: [],
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isAssignmentNode(node)).toEqual(true);
    });
  });

  describe('isConditionAtomNode', () => {
    it('checks if node is condition atom node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isConditionAtomNode(outcomeNode)).toEqual(false);

      const node: ConditionAtomNode = {
        kind: 'ConditionAtom',
        expression: {
          kind: 'JessieExpression',
          expression: 'test',
        },
      };
      expect(isConditionAtomNode(node)).toEqual(true);
    });
  });

  describe('isIterationAtomNode', () => {
    it('checks if node is iteration atom node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isIterationAtomNode(outcomeNode)).toEqual(false);

      const node: IterationAtomNode = {
        kind: 'IterationAtom',
        iterationVariable: 'test',
        iterable: {
          kind: 'JessieExpression',
          expression: 'test',
        },
      };
      expect(isIterationAtomNode(node)).toEqual(true);
    });
  });

  describe('isCallStatementNode', () => {
    it('checks if node is call statement node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isCallStatementNode(outcomeNode)).toEqual(false);

      const node: CallStatementNode = {
        kind: 'CallStatement',
        operationName: 'test',
        arguments: [],
        statements: [],
      };
      expect(isCallStatementNode(node)).toEqual(true);
    });
  });

  describe('isHttpRequestNode', () => {
    it('checks if node is http request node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isHttpRequestNode(outcomeNode)).toEqual(false);

      const node: HttpRequestNode = {
        kind: 'HttpRequest',
        security: [],
      };
      expect(isHttpRequestNode(node)).toEqual(true);
    });
  });

  describe('isHttpResponseHandlerNode', () => {
    it('checks if node is http request node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isHttpResponseHandlerNode(outcomeNode)).toEqual(false);

      const node: HttpResponseHandlerNode = {
        kind: 'HttpResponseHandler',
        statements: [],
      };
      expect(isHttpResponseHandlerNode(node)).toEqual(true);
    });
  });

  describe('isHttpCallStatementNode', () => {
    it('checks if node is http call statement node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isHttpCallStatementNode(outcomeNode)).toEqual(false);

      const node: HttpCallStatementNode = {
        kind: 'HttpCallStatement',
        method: 'GET',
        url: 'test/url',
        responseHandlers: [],
      };
      expect(isHttpCallStatementNode(node)).toEqual(true);
    });
  });

  describe('isInlineCallNode', () => {
    it('checks if node is http call statement node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(isInlineCallNode(outcomeNode)).toEqual(false);

      const node: InlineCallNode = {
        kind: 'InlineCall',
        operationName: 'test',
        arguments: [],
      };
      expect(isInlineCallNode(node)).toEqual(true);
    });
  });

  describe('assertMapDocumentNode', () => {
    it('asserts node is map definition node', () => {
      const outcomeNode: OutcomeStatementNode = {
        kind: 'OutcomeStatement',
        isError: false,
        terminateFlow: false,
        value: {
          kind: 'ObjectLiteral',
          fields: [],
        },
      };
      expect(() => assertMapDocumentNode(outcomeNode)).toThrow(
        "data must have required property 'astMetadata'"
      );

      const node: MapDocumentNode = {
        astMetadata: {
          sourceChecksum: 'checksum',
          astVersion: {
            major: 1,
            minor: 0,
            patch: 0,
          },
          parserVersion: {
            major: 1,
            minor: 0,
            patch: 0,
          },
        },
        kind: 'MapDocument',
        header: {
          kind: 'MapHeader',
          profile: {
            name: 'test',
            version: {
              major: 1,
              minor: 0,
            },
          },
          provider: 'provider',
        },
        definitions: [],
      };
      expect(assertMapDocumentNode(node)).toEqual(node);
    });
  });
});
