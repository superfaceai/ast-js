import { prepareAssert } from '../../validation';
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
import { Assert } from './utils';

const assertEquals: Assert<ProfileDocumentNode> = prepareAssert(schema);

// We don't need to do JSON Schema validation on these, as they should be already validated
export const isEnumDefinitionNode = (
  node: ProfileASTNode
): node is EnumDefinitionNode => node.kind === 'EnumDefinition';
export const isEnumValueNode = (node: ProfileASTNode): node is EnumValueNode =>
  node.kind === 'EnumValue';
export const isFieldDefinitionNode = (
  node: ProfileASTNode
): node is FieldDefinitionNode => node.kind === 'FieldDefinition';
export const isListDefinitionNode = (
  node: ProfileASTNode
): node is ListDefinitionNode => node.kind === 'ListDefinition';
export const isModelTypeNameNode = (
  node: ProfileASTNode
): node is ModelTypeNameNode => node.kind === 'ModelTypeName';
export const isNamedFieldDefinitionNode = (
  node: ProfileASTNode
): node is NamedFieldDefinitionNode => node.kind === 'NamedFieldDefinition';
export const isNamedModelDefinitionNode = (
  node: ProfileASTNode
): node is NamedModelDefinitionNode => node.kind === 'NamedModelDefinition';
export const isNonNullDefinitionNode = (
  node: ProfileASTNode
): node is NonNullDefinitionNode => node.kind === 'NonNullDefinition';
export const isObjectDefinitionNode = (
  node: ProfileASTNode
): node is ObjectDefinitionNode => node.kind === 'ObjectDefinition';
export const isPrimitiveTypeNameNode = (
  node: ProfileASTNode
): node is PrimitiveTypeNameNode => node.kind === 'PrimitiveTypeName';
export const isProfileDocumentNode = (
  node: ProfileASTNode
): node is ProfileDocumentNode => node.kind === 'ProfileDocument';
export const isProfileHeaderNode = (
  node: ProfileASTNode
): node is ProfileHeaderNode => node.kind === 'ProfileHeader';
export const isTypeDefinition = (
  input: ProfileASTNode
): input is TypeDefinition =>
  isObjectDefinitionNode(input) ||
  isEnumDefinitionNode(input) ||
  isUnionDefinitionNode(input) ||
  isNonNullDefinitionNode(input) ||
  isUseCaseExampleNode(input) ||
  isComlinkListLiteralNode(input);
export const isTypeName = (input: ProfileASTNode): input is TypeName =>
  isPrimitiveTypeNameNode(input) || isModelTypeNameNode(input);
export const isType = (input: ProfileASTNode): input is Type =>
  isTypeDefinition(input) || isTypeName(input);
export const isUnionDefinitionNode = (
  node: ProfileASTNode
): node is UnionDefinitionNode => node.kind === 'UnionDefinition';
export const isUseCaseDefinitionNode = (
  node: ProfileASTNode
): node is UseCaseDefinitionNode => node.kind === 'UseCaseDefinition';
export const isUseCaseSlotDefinitionNodeType = (
  node: ProfileASTNode
): node is UseCaseSlotDefinitionNode<Type> =>
  node.kind === 'UseCaseSlotDefinition' && isType(node.value);
export const isUseCaseSlotDefinitionNodeUseCaseExampleNode = (
  node: ProfileASTNode
): node is UseCaseSlotDefinitionNode<UseCaseExampleNode> =>
  node.kind === 'UseCaseSlotDefinition' && isUseCaseExampleNode(node.value);
export const isUseCaseSlotDefinitionNodeComlinkLiteralNode = (
  node: ProfileASTNode
): node is UseCaseSlotDefinitionNode<ComlinkLiteralNode> =>
  node.kind === 'UseCaseSlotDefinition' && isComlinkLiteralNode(node.value);
export const isUseCaseSlotDefinitionNodeObjectDefinitionNode = (
  node: ProfileASTNode
): node is UseCaseSlotDefinitionNode<ObjectDefinitionNode> =>
  node.kind === 'UseCaseSlotDefinition' && isObjectDefinitionNode(node.value);
export const isUseCaseSlotDefinitionNode = (
  input: ProfileASTNode
): input is UseCaseSlotDefinitionNode<
  Type | UseCaseExampleNode | ComlinkLiteralNode | ObjectDefinitionNode
> =>
  isUseCaseSlotDefinitionNodeType(input) ||
  isUseCaseSlotDefinitionNodeUseCaseExampleNode(input) ||
  isUseCaseSlotDefinitionNodeComlinkLiteralNode(input) ||
  isUseCaseSlotDefinitionNodeObjectDefinitionNode(input);
export const isUseCaseExampleNode = (
  node: ProfileASTNode
): node is UseCaseExampleNode => node.kind === 'UseCaseExample';
export const isComlinkPrimitiveLiteralNode = (
  node: ProfileASTNode
): node is ComlinkPrimitiveLiteralNode =>
  node.kind === 'ComlinkPrimitiveLiteral';
export const isComlinkObjectLiteralNode = (
  node: ProfileASTNode
): node is ComlinkObjectLiteralNode => node.kind === 'ComlinkObjectLiteral';
export const isComlinkListLiteralNode = (
  node: ProfileASTNode
): node is ComlinkListLiteralNode => node.kind === 'ComlinkListLiteral';
export const isComlinkLiteralNode = (
  node: ProfileASTNode
): node is ComlinkLiteralNode =>
  isComlinkPrimitiveLiteralNode(node) ||
  isComlinkListLiteralNode(node) ||
  isComlinkObjectLiteralNode(node);
export const isComlinkAssignmentNode = (
  node: ProfileASTNode
): node is ComlinkAssignmentNode => node.kind === 'ComlinkAssignment';
export const isDocumentDefinition = (
  input: ProfileASTNode
): input is DocumentDefinition =>
  isUseCaseDefinitionNode(input) ||
  isNamedModelDefinitionNode(input) ||
  isNamedFieldDefinitionNode(input);

export function assertProfileDocumentNode(node: unknown): ProfileDocumentNode {
  assertEquals(node);

  return node;
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
