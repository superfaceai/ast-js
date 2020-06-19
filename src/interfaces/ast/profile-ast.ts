export type ScalarTypeName = 'boolean' | 'number' | 'string';

export interface ModelTypeName extends ProfileASTNodeBase {
  kind: 'ModelTypeName';
  name: string;
}

export interface ObjectModelTypeName extends ProfileASTNodeBase {
  kind: 'ObjectModelTypeName';
  name: string;
}

export type ProfileNodeKind =
  | 'ProfileDocument'
  | 'Profile'
  | 'ProfileId'
  | 'UseCaseDefinition'
  | 'FieldDefinition'
  | 'ScalarModelDefinition'
  | 'ObjectModelDefinition'
  | 'UnionModelDefinition'
  | 'EnumModelDefinition'
  | 'EnumValueDefinition'
  | 'NamedType'
  | 'ListType'
  | 'NonNullType'
  | 'ModelTypeName'
  | 'ObjectModelTypeName';

// TODO: Same as in Map AST -> reuse?
export interface Location {
  start: number;
  end: number;
}

// TODO: Similar as in Map AST -> reuse?
export interface ProfileASTNodeBase {
  kind: ProfileNodeKind;
  loc?: Location;
}

// TODO: Same as in Map AST -> reuse?
export interface ProfileIdNode extends ProfileASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}

export interface DocumentedNode {
  title?: string;
  description?: string;
}

export interface ProfileNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'Profile';
  profileId: ProfileIdNode;
}

export interface ProfileDocumentNode extends ProfileASTNodeBase {
  kind: 'ProfileDocument';
  profile: ProfileNode;
  definitions: DocumentDefinition[];
}

export enum ProfileUseCaseSafety {
  safe = 'safe',
  unsafe = 'unsafe',
  idempotent = 'idempotent',
}

export interface NamedType extends ProfileASTNodeBase {
  kind: 'NamedType';
  type: ModelTypeName | ScalarTypeName;
}

export interface ListType extends ProfileASTNodeBase {
  kind: 'ListType';
  type: Type;
}

export interface NonNullType extends ProfileASTNodeBase {
  kind: 'NonNullType';
  type: NamedType | ListType | AnonymousModelDefinitionNode;
}

export type Type =
  | NamedType
  | ListType
  | NonNullType
  | AnonymousModelDefinitionNode;

export interface FieldDefinition extends ProfileASTNodeBase, DocumentedNode {
  kind: 'FieldDefinition';
  fieldName: string;
  type: Type;
  exampleValue?: string;
}

export interface ProfileUseCaseDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseDefinition';
  useCaseName: string;
  safety: ProfileUseCaseSafety;
  input?: ObjectModelDefinitionNode | ObjectModelTypeName;
  result: ObjectModelDefinitionNode | ObjectModelTypeName;
  errors?: ObjectModelTypeName[];
}

export interface NamedScalarModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'ScalarModelDefinition';
  modelName: ModelTypeName;
  baseType: ScalarTypeName;
}

export interface ObjectModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'ObjectModelDefinition';
  fields: FieldDefinition[];
}

export interface NamedObjectModelDefinitionNode
  extends ObjectModelDefinitionNode {
  modelName: ObjectModelTypeName;
}

export interface UnionModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UnionModelDefinition';
  modelName: ModelTypeName;
}

export interface NamedUnionModelDefinitionNode
  extends UnionModelDefinitionNode {
  modelName: ModelTypeName;
}

export interface EnumModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'EnumModelDefinition';
  enumValues: EnumValueDefinition[];
}

export interface NamedEnumModelDefinitionNode extends EnumModelDefinitionNode {
  modelName: ModelTypeName;
}

export interface EnumValueDefinition
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'EnumValueDefinition';
  enumValue: string | number;
}

export type AnonymousModelDefinitionNode =
  | ObjectModelDefinitionNode
  | UnionModelDefinitionNode
  | EnumModelDefinitionNode;

export type ProfileModelDefinitionNode =
  | NamedScalarModelDefinitionNode
  | NamedObjectModelDefinitionNode
  | NamedUnionModelDefinitionNode
  | NamedEnumModelDefinitionNode;

export type DocumentDefinition =
  | ProfileUseCaseDefinitionNode
  | ProfileModelDefinitionNode;
