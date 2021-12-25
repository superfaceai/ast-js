import { prepareAssert, preparePrepareIs } from '../../validation';
import {
  ComlinkAssignmentNode,
  ComlinkListLiteralNode,
  ComlinkLiteralNode,
  ComlinkObjectLiteralNode,
  ComlinkPrimitiveLiteralNode,
  DocumentDefinition,
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
  ProfileASTNode,
  ProfileDocumentNode,
  ProfileHeaderNode,
  Type,
  TypeDefinition,
  TypeName,
  UnionDefinitionNode,
  UseCaseDefinitionNode,
  UseCaseExampleNode,
  UseCaseSlotDefinitionNode,
} from './profile-ast';
import * as schema from './profile-ast.schema.json';
import { Assert, Guard } from './utils';

const prepareIs = preparePrepareIs(schema);
const assertEquals: Assert<ProfileDocumentNode> = prepareAssert(schema);

export const isEnumDefinitionNode: Guard<EnumDefinitionNode> =
  prepareIs<EnumDefinitionNode>('#/definitions/EnumDefinitionNode');
export const isEnumValueNode: Guard<EnumValueNode> = prepareIs<EnumValueNode>(
  '#/definitions/EnumValueNode'
);
export const isFieldDefinitionNode: Guard<FieldDefinitionNode> =
  prepareIs<FieldDefinitionNode>('#/definitions/FieldDefinitionNode');
export const isListDefinitionNode: Guard<ListDefinitionNode> =
  prepareIs<ListDefinitionNode>('#/definitions/ListDefinitionNode');
export const isModelTypeNameNode: Guard<ModelTypeNameNode> =
  prepareIs<ModelTypeNameNode>('#/definitions/ModelTypeNameNode');
export const isNamedFieldDefinitionNode: Guard<NamedFieldDefinitionNode> =
  prepareIs<NamedFieldDefinitionNode>('#/definitions/NamedFieldDefinitionNode');
export const isNamedModelDefinitionNode: Guard<NamedModelDefinitionNode> =
  prepareIs<NamedModelDefinitionNode>('#/definitions/NamedModelDefinitionNode');
export const isNonNullDefinitionNode: Guard<NonNullDefinitionNode> =
  prepareIs<NonNullDefinitionNode>('#/definitions/NonNullDefinitionNode');
export const isObjectDefinitionNode: Guard<ObjectDefinitionNode> =
  prepareIs<ObjectDefinitionNode>('#/definitions/ObjectDefinitionNode');
export const isPrimitiveTypeNameNode: Guard<PrimitiveTypeNameNode> =
  prepareIs<PrimitiveTypeNameNode>('#/definitions/PrimitiveTypeNameNode');
export const isProfileASTNode: Guard<ProfileASTNode> =
  prepareIs<ProfileASTNode>('#/definitions/ProfileASTNode');
export const isProfileDocumentNode: Guard<ProfileDocumentNode> =
  prepareIs<ProfileDocumentNode>('#/definitions/ProfileDocumentNode');
export const isProfileHeaderNode: Guard<ProfileHeaderNode> =
  prepareIs<ProfileHeaderNode>('#/definitions/ProfileHeaderNode');
export const isTypeDefinition: Guard<TypeDefinition> = (
  input: unknown
): input is TypeDefinition =>
  isObjectDefinitionNode(input) ||
  isEnumDefinitionNode(input) ||
  isUnionDefinitionNode(input) ||
  isNonNullDefinitionNode(input) ||
  isUseCaseExampleNode(input) ||
  isComlinkListLiteralNode(input);
export const isTypeName: Guard<TypeName> = (
  input: unknown
): input is TypeName =>
  isPrimitiveTypeNameNode(input) || isModelTypeNameNode(input);
export const isType: Guard<Type> = (input: unknown): input is Type =>
  isTypeDefinition(input) || isTypeName(input);
export const isUnionDefinitionNode: Guard<UnionDefinitionNode> =
  prepareIs<UnionDefinitionNode>('#/definitions/UnionDefinitionNode');
export const isUseCaseDefinitionNode: Guard<UseCaseDefinitionNode> =
  prepareIs<UseCaseDefinitionNode>('#/definitions/UseCaseDefinitionNode');
export const isUseCaseSlotDefinitionNodeType = prepareIs<
  UseCaseSlotDefinitionNode<Type>
>('#/definitions/UseCaseSlotDefinitionNode<Type>');
export const isUseCaseSlotDefinitionNodeUseCaseExampleNode = prepareIs<
  UseCaseSlotDefinitionNode<UseCaseExampleNode>
>('#/definitions/UseCaseSlotDefinitionNode<UseCaseExampleNode>');
export const isUseCaseSlotDefinitionNodeComlinkLiteralNode = prepareIs<
  UseCaseSlotDefinitionNode<ComlinkLiteralNode>
>('#/definitions/UseCaseSlotDefinitionNode<ComlinkLiteralNode>');
export const isUseCaseSlotDefinitionNodeObjectDefinitionNode = prepareIs<
  UseCaseSlotDefinitionNode<ObjectDefinitionNode>
>('#/definitions/UseCaseSlotDefinitionNode<ObjectDefinitionNode>');
export const isUseCaseSlotDefinitionNode: Guard<
  UseCaseSlotDefinitionNode<ProfileASTNode>
> = (input: unknown): input is UseCaseSlotDefinitionNode<ProfileASTNode> =>
  isUseCaseSlotDefinitionNodeType(input) ||
  isUseCaseSlotDefinitionNodeUseCaseExampleNode(input) ||
  isUseCaseSlotDefinitionNodeComlinkLiteralNode(input) ||
  isUseCaseSlotDefinitionNodeObjectDefinitionNode(input);
export const isUseCaseExampleNode: Guard<UseCaseExampleNode> =
  prepareIs<UseCaseExampleNode>('#/definitions/UseCaseExampleNode');
export const isComlinkPrimitiveLiteralNode: Guard<ComlinkPrimitiveLiteralNode> =
  prepareIs<ComlinkPrimitiveLiteralNode>(
    '#/definitions/ComlinkPrimitiveLiteralNode'
  );
export const isComlinkObjectLiteralNode: Guard<ComlinkObjectLiteralNode> =
  prepareIs<ComlinkObjectLiteralNode>('#/definitions/ComlinkObjectLiteralNode');
export const isComlinkListLiteralNode: Guard<ComlinkListLiteralNode> =
  prepareIs<ComlinkListLiteralNode>('#/definitions/ComlinkListLiteralNode');
export const isComlinkLiteralNode: Guard<ComlinkLiteralNode> =
  prepareIs<ComlinkLiteralNode>('#/definitions/ComlinkLiteralNode');
export const isComlinkAssignmentNode: Guard<ComlinkAssignmentNode> =
  prepareIs<ComlinkAssignmentNode>('#/definitions/ComlinkAssignmentNode');
export const isDocumentDefinition: Guard<DocumentDefinition> = (
  input: unknown
): input is DocumentDefinition =>
  isUseCaseDefinitionNode(input) ||
  isNamedModelDefinitionNode(input) ||
  isNamedFieldDefinitionNode(input);

export function assertProfileDocumentNode(node: unknown): ProfileDocumentNode {
  assertEquals(node);

  return node;
  // const assert = createAssertEquals<ProfileDocumentNode>();
  // try {
  //   return assert(node);
  // } catch (error) {
  //   if (error instanceof TypeGuardError) {
  //     throw new AssertionError(`Profile AST ${error.message}`, error.path);
  //   }
  //   throw error;
  // }
}

export interface ProfileAstVisitor<R = unknown> {
  visit(node: ProfileASTNode, ...parameters: unknown[]): R;
  visitEnumDefinitionNode(
    node: EnumDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitEnumValueNode(node: EnumValueNode, ...parameters: unknown[]): R;
  visitFieldDefinitionNode(
    node: FieldDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitListDefinitionNode(
    node: ListDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitModelTypeNameNode(node: ModelTypeNameNode, ...parameters: unknown[]): R;
  visitNamedFieldDefinitionNode(
    node: NamedFieldDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitNamedModelDefinitionNode(
    node: NamedModelDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitNonNullDefinitionNode(
    node: NonNullDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitObjectDefinitionNode(
    node: ObjectDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitPrimitiveTypeNameNode(
    node: PrimitiveTypeNameNode,
    ...parameters: unknown[]
  ): R;
  visitProfileDocumentNode(
    node: ProfileDocumentNode,
    ...parameters: unknown[]
  ): R;
  visitProfileHeaderNode(node: ProfileHeaderNode, ...parameters: unknown[]): R;
  visitUnionDefinitionNode(
    node: UnionDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitUseCaseDefinitionNode(
    node: UseCaseDefinitionNode,
    ...parameters: unknown[]
  ): R;
  visitUseCaseExampleNode(
    node: UseCaseExampleNode,
    ...parameters: unknown[]
  ): R;
  visitComlinkPrimitiveLiteralNode(
    node: ComlinkPrimitiveLiteralNode,
    ...parameters: unknown[]
  ): R;
  visitComlinkObjectLiteralNode(
    node: ComlinkObjectLiteralNode,
    ...parameters: unknown[]
  ): R;
  visitComlinkListLiteralNode(
    node: ComlinkListLiteralNode,
    ...parameters: unknown[]
  ): R;
  visitComlinkAssignmentNode(
    node: ComlinkAssignmentNode,
    ...parameters: unknown[]
  ): R;
}
