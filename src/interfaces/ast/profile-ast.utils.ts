import { createAssertEquals, createIs, TypeGuardError } from 'typescript-is';

import { AssertionError } from '../../error';
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
import { Guard } from './utils';

export const isDocumentDefinition: Guard<DocumentDefinition> =
  createIs<DocumentDefinition>();
export const isEnumDefinitionNode: Guard<EnumDefinitionNode> =
  createIs<EnumDefinitionNode>();
export const isEnumValueNode: Guard<EnumValueNode> = createIs<EnumValueNode>();
export const isFieldDefinitionNode: Guard<FieldDefinitionNode> =
  createIs<FieldDefinitionNode>();
export const isListDefinitionNode: Guard<ListDefinitionNode> =
  createIs<ListDefinitionNode>();
export const isModelTypeNameNode: Guard<ModelTypeNameNode> =
  createIs<ModelTypeNameNode>();
export const isNamedFieldDefinitionNode: Guard<NamedFieldDefinitionNode> =
  createIs<NamedFieldDefinitionNode>();
export const isNamedModelDefinitionNode: Guard<NamedModelDefinitionNode> =
  createIs<NamedModelDefinitionNode>();
export const isNonNullDefinitionNode: Guard<NonNullDefinitionNode> =
  createIs<NonNullDefinitionNode>();
export const isObjectDefinitionNode: Guard<ObjectDefinitionNode> =
  createIs<ObjectDefinitionNode>();
export const isPrimitiveTypeNameNode: Guard<PrimitiveTypeNameNode> =
  createIs<PrimitiveTypeNameNode>();
export const isProfileASTNode: Guard<ProfileASTNode> =
  createIs<ProfileASTNode>();
export const isProfileDocumentNode: Guard<ProfileDocumentNode> =
  createIs<ProfileDocumentNode>();
export const isProfileHeaderNode: Guard<ProfileHeaderNode> =
  createIs<ProfileHeaderNode>();
export const isType: Guard<Type> = createIs<Type>();
export const isTypeDefinition: Guard<TypeDefinition> =
  createIs<TypeDefinition>();
export const isTypeName: Guard<TypeName> = createIs<TypeName>();
export const isUnionDefinitionNode: Guard<UnionDefinitionNode> =
  createIs<UnionDefinitionNode>();
export const isUseCaseDefinitionNode: Guard<UseCaseDefinitionNode> =
  createIs<UseCaseDefinitionNode>();
export const isUseCaseSlotDefinitionNode: Guard<
  UseCaseSlotDefinitionNode<ProfileASTNode>
> = createIs<UseCaseSlotDefinitionNode<ProfileASTNode>>();
export const isUseCaseExampleNode: Guard<UseCaseExampleNode> =
  createIs<UseCaseExampleNode>();
export const isComlinkPrimitiveLiteralNode: Guard<ComlinkPrimitiveLiteralNode> =
  createIs<ComlinkPrimitiveLiteralNode>();
export const isComlinkObjectLiteralNode: Guard<ComlinkObjectLiteralNode> =
  createIs<ComlinkObjectLiteralNode>();
export const isComlinkListLiteralNode: Guard<ComlinkListLiteralNode> =
  createIs<ComlinkListLiteralNode>();
export const isComlinkLiteralNode: Guard<ComlinkLiteralNode> =
  createIs<ComlinkLiteralNode>();
export const isComlinkAssignmentNode: Guard<ComlinkAssignmentNode> =
  createIs<ComlinkAssignmentNode>();

export function assertProfileDocumentNode(node: unknown): ProfileDocumentNode {
  const assert = createAssertEquals<ProfileDocumentNode>();
  try {
    return assert(node);
  } catch (error) {
    if (error instanceof TypeGuardError) {
      throw new AssertionError(`Profile AST ${error.message}`, error.path);
    }
    throw error;
  }
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
