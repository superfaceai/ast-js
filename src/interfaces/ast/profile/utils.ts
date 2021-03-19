import {
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
  UseCaseSlotDefinitionNode,
} from './ast';

export function isPrimitiveTypeNameNode(
  node: ProfileASTNode
): node is PrimitiveTypeNameNode {
  return node.kind === 'PrimitiveTypeName';
}

export function isModelTypeNameNode(
  node: ProfileASTNode
): node is ModelTypeNameNode {
  return node.kind === 'ModelTypeName';
}

export function isTypeName(node: ProfileASTNode): node is TypeName {
  return isPrimitiveTypeNameNode(node) || isModelTypeNameNode(node);
}

export function isEnumDefinitionNode(
  node: ProfileASTNode
): node is EnumDefinitionNode {
  return node.kind === 'EnumDefinition';
}

export function isObjectDefinitionNode(
  node: ProfileASTNode
): node is ObjectDefinitionNode {
  return node.kind === 'ObjectDefinition';
}

export function isListDefinitionNode(
  node: ProfileASTNode
): node is ListDefinitionNode {
  return node.kind === 'ListDefinition';
}

export function isNonNullDefinitionNode(
  node: ProfileASTNode
): node is NonNullDefinitionNode {
  return node.kind === 'NonNullDefinition';
}

export function isUnionDefinitionNode(
  node: ProfileASTNode
): node is UnionDefinitionNode {
  return node.kind === 'UnionDefinition';
}

export function isTypeDefinition(node: ProfileASTNode): node is TypeDefinition {
  return (
    isObjectDefinitionNode(node) ||
    isEnumDefinitionNode(node) ||
    isUnionDefinitionNode(node) ||
    isListDefinitionNode(node) ||
    isNonNullDefinitionNode(node)
  );
}

export function isType(node: ProfileASTNode): node is Type {
  return isTypeName(node) || isTypeDefinition(node);
}

export function isEnumValueNode(node: ProfileASTNode): node is EnumValueNode {
  return node.kind === 'EnumValue';
}

export function isFieldDefinitionNode(
  node: ProfileASTNode
): node is FieldDefinitionNode {
  return node.kind === 'FieldDefinition';
}

export function isNamedFieldDefinitionNode(
  node: ProfileASTNode
): node is NamedFieldDefinitionNode {
  return node.kind === 'NamedFieldDefinition';
}

export function isNamedModelDefinitionNode(
  node: ProfileASTNode
): node is NamedModelDefinitionNode {
  return node.kind === 'NamedModelDefinition';
}

export function isUseCaseSlotDefinitionNode(
  node: ProfileASTNode
): node is UseCaseSlotDefinitionNode {
  return node.kind === 'UseCaseSlotDefinition';
}

export function isUseCaseDefinitionNode(
  node: ProfileASTNode
): node is UseCaseDefinitionNode {
  return node.kind === 'UseCaseDefinition';
}

export function isProfileHeaderNode(
  node: ProfileASTNode
): node is ProfileHeaderNode {
  return node.kind === 'ProfileHeader';
}

export function isProfileDocumentNode(
  node: ProfileASTNode
): node is ProfileDocumentNode {
  return node.kind === 'ProfileDocument';
}

export function isDocumentDefinition(
  node: ProfileASTNode
): node is DocumentDefinition {
  return (
    isUseCaseDefinitionNode(node) ||
    isNamedFieldDefinitionNode(node) ||
    isNamedModelDefinitionNode(node)
  );
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
}
