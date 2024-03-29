import {
  ComlinkAssignmentNode,
  ComlinkListLiteralNode,
  ComlinkNoneLiteralNode,
  ComlinkObjectLiteralNode,
  ComlinkPrimitiveLiteralNode,
  EnumDefinitionNode,
  EnumValueNode,
  FieldDefinitionNode,
  ListDefinitionNode,
  ModelTypeNameNode,
  NamedFieldDefinitionNode,
  NamedModelDefinitionNode,
  NonNullDefinitionNode,
  ObjectDefinitionNode,
  PrimitiveTypeNameNode,
  ProfileDocumentNode,
  ProfileHeaderNode,
  Type,
  UnionDefinitionNode,
  UseCaseDefinitionNode,
  UseCaseExampleNode,
  UseCaseSlotDefinitionNode,
} from './profile-ast';
import {
  assertProfileDocumentNode,
  isComlinkAssignmentNode,
  isComlinkListLiteralNode,
  isComlinkLiteralNode,
  isComlinkNoneLiteralNode,
  isComlinkObjectLiteralNode,
  isComlinkPrimitiveLiteralNode,
  isDocumentDefinition,
  isEnumDefinitionNode,
  isEnumValueNode,
  isFieldDefinitionNode,
  isListDefinitionNode,
  isModelTypeNameNode,
  isNamedFieldDefinitionNode,
  isNamedModelDefinitionNode,
  isNonNullDefinitionNode,
  isObjectDefinitionNode,
  isPrimitiveTypeNameNode,
  isProfileDocumentNode,
  isProfileHeaderNode,
  isType,
  isTypeDefinition,
  isTypeName,
  isUnionDefinitionNode,
  isUseCaseDefinitionNode,
  isUseCaseExampleNode,
  isUseCaseSlotDefinitionNode,
} from './profile-ast.utils';

describe('profile-ast.utils', () => {
  describe('isPrimitiveTypeNameNode', () => {
    it('checks if node is primitive type name node', () => {
      const validNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isPrimitiveTypeNameNode(validNode)).toEqual(true);

      const invalidNode: ModelTypeNameNode = {
        kind: 'ModelTypeName',
        name: 'test',
      };
      expect(isPrimitiveTypeNameNode(invalidNode)).toEqual(false);
    });
  });

  describe('isModelTypeNameNode', () => {
    it('checks if node is model type name node', () => {
      const validNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isModelTypeNameNode(validNode)).toEqual(false);

      const invalidNode: ModelTypeNameNode = {
        kind: 'ModelTypeName',
        name: 'test',
      };
      expect(isModelTypeNameNode(invalidNode)).toEqual(true);
    });
  });

  describe('isTypeName', () => {
    it('checks if node is type name node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isTypeName(primitiveNode)).toEqual(true);

      const typeNameNode: ModelTypeNameNode = {
        kind: 'ModelTypeName',
        name: 'test',
      };
      expect(isTypeName(typeNameNode)).toEqual(true);

      const invalidNode: EnumDefinitionNode = {
        kind: 'EnumDefinition',
        values: [],
      };
      expect(isTypeName(invalidNode)).toEqual(false);
    });
  });

  describe('isEnumDefinitionNode', () => {
    it('checks if node is enum definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isEnumDefinitionNode(primitiveNode)).toEqual(false);

      const enumNode: EnumDefinitionNode = {
        kind: 'EnumDefinition',
        values: [],
      };
      expect(isEnumDefinitionNode(enumNode)).toEqual(true);
    });
  });

  describe('isObjectDefinitionNode', () => {
    it('checks if node is object definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isObjectDefinitionNode(primitiveNode)).toEqual(false);

      const objectNode: ObjectDefinitionNode = {
        kind: 'ObjectDefinition',
        fields: [],
      };
      expect(isObjectDefinitionNode(objectNode)).toEqual(true);
    });
  });

  describe('isListDefinitionNode', () => {
    it('checks if node is list definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isListDefinitionNode(primitiveNode)).toEqual(false);

      const listNode: ListDefinitionNode = {
        kind: 'ListDefinition',
        elementType: primitiveNode,
      };
      expect(isListDefinitionNode(listNode)).toEqual(true);
    });
  });

  describe('isNonNullDefinitionNode', () => {
    it('checks if node is non null definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      const listNode: ListDefinitionNode = {
        kind: 'ListDefinition',
        elementType: primitiveNode,
      };
      expect(isNonNullDefinitionNode(listNode)).toEqual(false);

      const nonNullNode: NonNullDefinitionNode = {
        kind: 'NonNullDefinition',
        type: listNode,
      };
      expect(isNonNullDefinitionNode(nonNullNode)).toEqual(true);
    });
  });

  describe('isUnionDefinitionNode', () => {
    it('checks if node is union definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isUnionDefinitionNode(primitiveNode)).toEqual(false);

      const unionNode: UnionDefinitionNode = {
        kind: 'UnionDefinition',
        types: [],
      };
      expect(isUnionDefinitionNode(unionNode)).toEqual(true);
    });
  });

  describe('isTypeDefinition', () => {
    it('checks if node is type definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isTypeDefinition(primitiveNode)).toEqual(false);

      const unionNode: UnionDefinitionNode = {
        kind: 'UnionDefinition',
        types: [],
      };
      expect(isTypeDefinition(unionNode)).toEqual(true);
    });
  });

  describe('isType', () => {
    it('checks if node is type definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isType(primitiveNode)).toEqual(true);

      const unionNode: UnionDefinitionNode = {
        kind: 'UnionDefinition',
        types: [],
      };
      expect(isType(unionNode)).toEqual(true);

      const enumValueNode: EnumValueNode = {
        kind: 'EnumValue',
        name: 'FOO',
        value: 1,
      };
      expect(isType(enumValueNode)).toEqual(false);
    });
  });

  describe('isEnumValueNode', () => {
    it('checks if node is enum value node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isEnumValueNode(primitiveNode)).toEqual(false);

      const enumValueNode: EnumValueNode = {
        kind: 'EnumValue',
        name: 'FOO',
        value: 1,
      };
      expect(isEnumValueNode(enumValueNode)).toEqual(true);
    });
  });

  describe('isFieldDefinitionNode', () => {
    it('checks if node is field definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isFieldDefinitionNode(primitiveNode)).toEqual(false);

      const node: FieldDefinitionNode = {
        kind: 'FieldDefinition',
        fieldName: 'test',
        required: true,
      };
      expect(isFieldDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isNamedFieldDefinitionNode', () => {
    it('checks if node is named field definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isNamedFieldDefinitionNode(primitiveNode)).toEqual(false);

      const node: NamedFieldDefinitionNode = {
        kind: 'NamedFieldDefinition',
        fieldName: 'test',
      };
      expect(isNamedFieldDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isNamedModelDefinitionNode', () => {
    it('checks if node is named model definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isNamedModelDefinitionNode(primitiveNode)).toEqual(false);

      const node: NamedModelDefinitionNode = {
        kind: 'NamedModelDefinition',
        modelName: 'test',
      };
      expect(isNamedModelDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isUseCaseSlotDefinitionNode', () => {
    it('checks if node is use case slot definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isUseCaseSlotDefinitionNode(primitiveNode)).toEqual(false);

      const node: UseCaseSlotDefinitionNode<Type> = {
        kind: 'UseCaseSlotDefinition',
        value: {
          kind: 'PrimitiveTypeName',
          name: 'boolean',
        },
      };
      expect(isUseCaseSlotDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isUseCaseDefinitionNode', () => {
    it('checks if node is use case definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isUseCaseDefinitionNode(primitiveNode)).toEqual(false);

      const node: UseCaseDefinitionNode = {
        kind: 'UseCaseDefinition',
        useCaseName: 'test',
      };
      expect(isUseCaseDefinitionNode(node)).toEqual(true);
    });
  });

  describe('isProfileHeaderNode', () => {
    it('checks if node is profile header node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isProfileHeaderNode(primitiveNode)).toEqual(false);

      const node: ProfileHeaderNode = {
        kind: 'ProfileHeader',
        name: 'test',
        version: {
          major: 1,
          minor: 0,
          patch: 0,
        },
      };
      expect(isProfileHeaderNode(node)).toEqual(true);
    });
  });

  describe('isProfileDocumentNode', () => {
    it('checks if node is profile document node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isProfileDocumentNode(primitiveNode)).toEqual(false);

      const node: ProfileDocumentNode = {
        kind: 'ProfileDocument',
        astMetadata: {
          astVersion: { major: 1, minor: 0, patch: 0 },
          parserVersion: { major: 1, minor: 0, patch: 0 },
          sourceChecksum: 'dsdds',
        },
        header: {
          kind: 'ProfileHeader',
          name: 'test',
          version: {
            major: 1,
            minor: 0,
            patch: 0,
          },
        },
        definitions: [],
      };
      expect(isProfileDocumentNode(node)).toEqual(true);
    });
  });

  describe('isDocumentDefinition', () => {
    it('checks if node is document definition node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isDocumentDefinition(primitiveNode)).toEqual(false);

      const node: NamedFieldDefinitionNode = {
        kind: 'NamedFieldDefinition',
        fieldName: 'test',
      };
      expect(isDocumentDefinition(node)).toEqual(true);
    });
  });

  describe('isUseCaseExample', () => {
    it('checks if node is usecase example node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isUseCaseExampleNode(primitiveNode)).toEqual(false);

      const node: UseCaseExampleNode = {
        kind: 'UseCaseExample',
        exampleName: 'test',
      };
      expect(isUseCaseExampleNode(node)).toEqual(true);
    });
  });

  describe('isComlinkNoneLiteral', () => {
    it('checks if node is comlink primitive literal node', () => {
      const node: ComlinkNoneLiteralNode = {
        kind: 'ComlinkNoneLiteral'
      };
      expect(isComlinkNoneLiteralNode(node)).toEqual(true);
    });
  });

  describe('isComlinkPrimitiveLiteral', () => {
    it('checks if node is comlink primitive literal node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isComlinkPrimitiveLiteralNode(primitiveNode)).toEqual(false);

      const node: ComlinkPrimitiveLiteralNode = {
        kind: 'ComlinkPrimitiveLiteral',
        value: 'test',
      };
      expect(isComlinkPrimitiveLiteralNode(node)).toEqual(true);
    });
  });

  describe('isComlinkObjectLiteral', () => {
    it('checks if node is comlink object literal node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isComlinkObjectLiteralNode(primitiveNode)).toEqual(false);

      const node: ComlinkObjectLiteralNode = {
        kind: 'ComlinkObjectLiteral',
        fields: [
          {
            kind: 'ComlinkAssignment',
            key: ['key'],
            value: {
              kind: 'ComlinkPrimitiveLiteral',
              value: 'test',
            },
          },
        ],
      };
      expect(isComlinkObjectLiteralNode(node)).toEqual(true);
    });
  });

  describe('isComlinkListLiteral', () => {
    it('checks if node is comlink list literal node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isComlinkListLiteralNode(primitiveNode)).toEqual(false);

      const node: ComlinkListLiteralNode = {
        kind: 'ComlinkListLiteral',
        items: [
          {
            kind: 'ComlinkPrimitiveLiteral',
            value: 'test',
          },
        ],
      };
      expect(isComlinkListLiteralNode(node)).toEqual(true);
    });
  });

  describe('isComlinkLiteral', () => {
    it('checks if node is comlink literal node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isComlinkLiteralNode(primitiveNode)).toEqual(false);

      const node: ComlinkListLiteralNode = {
        kind: 'ComlinkListLiteral',
        items: [
          {
            kind: 'ComlinkPrimitiveLiteral',
            value: 'test',
          },
        ],
      };
      expect(isComlinkLiteralNode(node)).toEqual(true);
    });
  });

  describe('isComlinkAssignment', () => {
    it('checks if node is comlink assignment node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(isComlinkAssignmentNode(primitiveNode)).toEqual(false);

      const node: ComlinkAssignmentNode = {
        kind: 'ComlinkAssignment',
        key: ['test'],
        value: {
          kind: 'ComlinkPrimitiveLiteral',
          value: 'test',
        },
      };
      expect(isComlinkAssignmentNode(node)).toEqual(true);
    });
  });

  describe('assertProfileDocumentNode', () => {
    it('asserts node is profile document node', () => {
      const primitiveNode: PrimitiveTypeNameNode = {
        kind: 'PrimitiveTypeName',
        name: 'boolean',
      };
      expect(() => assertProfileDocumentNode(primitiveNode)).toThrow(
        '$: must have required property "astMetadata"'
      );

      const node: ProfileDocumentNode = {
        kind: 'ProfileDocument',
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
        header: {
          kind: 'ProfileHeader',
          name: 'test',
          version: {
            major: 1,
            minor: 0,
            patch: 0,
          },
        },
        definitions: [],
      };
      expect(assertProfileDocumentNode(node)).toEqual(node);
    });
  });
});
