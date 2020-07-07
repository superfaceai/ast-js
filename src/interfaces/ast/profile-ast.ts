import { Location, Span } from './source';

// BASE //

export type ProfileNodeKind =
  // TYPES
  | 'ScalarTypeName'
  | 'ObjectModelDefinition'
  | 'FieldDefinition'
  | 'UnionModelDefinition'
  | 'EnumModelDefinition'
  | 'EnumValueDefinition'
  | 'ModelTypeName'
  | 'ListType'
  | 'NonNullType'
  // MODELS
  | 'ScalarModelDefinition'
  // USECASE
  | 'UseCaseDefinition'
  // DOCUMENT
  | 'ProfileId'
  | 'Profile'
  | 'ProfileDocument';

export interface ProfileASTNodeBase {
  kind: ProfileNodeKind;
  span?: Span;
  location?: Location;
}

/** Node preceded by documenting string literal */
export interface DocumentedNode {
  title?: string;
  description?: string;
}

// TYPES //

/** From keywords: `Boolean`, `Number` and `String` */
export interface ScalarTypeName extends ProfileASTNodeBase {
  kind: 'ScalarTypeName';
  name: 'boolean' | 'number' | 'string';
}

/**
 * Construct of form:
 * `{ fields... }`
 */
export interface ObjectModelDefinitionNode
  extends ProfileASTNodeBase {
  kind: 'ObjectModelDefinition';
  fields: FieldDefinition[];
}
/**
 * Construct of form:
 * `ident: type` or `ident`
 * that appear inside object model definitions
 */
export interface FieldDefinition extends ProfileASTNodeBase, DocumentedNode {
  kind: 'FieldDefinition';
  fieldName: string;
  type?: Type;
}
/**
 * Construct of form:
 * `type | type | ...`
 */
export interface UnionModelDefinitionNode
  extends ProfileASTNodeBase {
  kind: 'UnionModelDefinition';
  types: Type[];
}
/**
 * Construct of form:
 * `enum { values... }`
 */
export interface EnumModelDefinitionNode
  extends ProfileASTNodeBase {
  kind: 'EnumModelDefinition';
  enumValues: EnumValueDefinition[];
}
/**
 * Variant of an enum definition.
 *
 * These are either string or number literals
 */
export interface EnumValueDefinition extends ProfileASTNodeBase {
  kind: 'EnumValueDefinition';
  enumValue: string | number | boolean;
}

export type AnonymousModelDefinitionNode =
  | ObjectModelDefinitionNode
  | UnionModelDefinitionNode
  | EnumModelDefinitionNode;

/**
 * Name of a model type parsed from identifiers.
 *
 * This is the name of a user defined type.
 */
export interface ModelTypeName extends ProfileASTNodeBase {
  kind: 'ModelTypeName';
  name: string;
}

/** Array type: `[type]` */
export interface ListType extends ProfileASTNodeBase {
  kind: 'ListType';
  type: Type;
}
/** Non-null assertion operator: `type!` */
export interface NonNullType extends ProfileASTNodeBase {
  kind: 'NonNullType';
  type:
    | ScalarTypeName
    | ModelTypeName
    | ListType
    | AnonymousModelDefinitionNode;
}

export type Type =
  | ScalarTypeName
  | AnonymousModelDefinitionNode
  | ModelTypeName
  | ListType
  | NonNullType;

// MODELS //

/**
 * Construct of form:
 * `field ident: ScalarType` or `field ident: ModelType`
 *
 * This is basically a type alias.
 */
export interface NamedScalarModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'ScalarModelDefinition';
  modelName: ModelTypeName;
  baseType: ScalarTypeName | ModelTypeName;
}

/**
 * Construct of form:
 * `model ident { fields... }`
 */
export interface NamedObjectModelDefinitionNode
  extends ObjectModelDefinitionNode, DocumentedNode {
  modelName: ModelTypeName;
}

/**
 * Construct of form:
 * `field ident: type | type | ...`
 */
export interface NamedUnionModelDefinitionNode
  extends UnionModelDefinitionNode, DocumentedNode {
  modelName: ModelTypeName;
}

/**
 * Construct of form:
 * `enum ident { values ... }`
 */
export interface NamedEnumModelDefinitionNode extends EnumModelDefinitionNode, DocumentedNode {
  modelName: ModelTypeName;
}

export type ProfileModelDefinitionNode =
  | NamedScalarModelDefinitionNode
  | NamedObjectModelDefinitionNode
  | NamedUnionModelDefinitionNode
  | NamedEnumModelDefinitionNode;

// USECASE //

/** Usecase safety indicator, corresponds to decorators */
export enum ProfileUseCaseSafety {
  safe = 'safe',
  unsafe = 'unsafe',
  idempotent = 'idempotent',
}

/**
* Construct of form:
```
usecase ident @deco {
  input: type
  result: type
  errors: [
    type
    type
    ...
  ]
}
```
*/
export interface ProfileUseCaseDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseDefinition';
  useCaseName: string;
  safety: ProfileUseCaseSafety;
  input?: Type;
  result: Type;
  asyncResult: boolean;
  errors?: Type[];
}

// DOCUMENT //

/** `profile: string` */
export interface ProfileProfileIdNode extends ProfileASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}
/**
 * The node containing document information at the top of the document.
 */
export interface ProfileNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'Profile';
  profileId: ProfileProfileIdNode;
}
/** Node enclosing the whole document */
export interface ProfileDocumentNode extends ProfileASTNodeBase {
  kind: 'ProfileDocument';
  profile: ProfileNode;
  definitions: DocumentDefinition[];
}
export type DocumentDefinition =
  | ProfileUseCaseDefinitionNode
  | ProfileModelDefinitionNode;
