import { Location, Span } from './source';

// BASE //

export type ProfileNodeKind =
  // TYPES
  | 'PrimitiveType'
  | 'ModelReference'
  | 'EnumDefinition'
  | 'ObjectDefinition'
  | 'ListDefinition'
  | 'NonNullDefinition'
  | 'UnionDefinition'
  // FIELDS
  | 'FieldDefinition'
  | 'NamedFieldDefinition'
  // MODELS
  | 'NamedModelDefinition'
  // USECASE
  | 'UseCaseDefinition'
  // DOCUMENT
  | 'ProfileId'
  | 'Profile'
  | 'ProfileDocument';

export interface ProfileASTNodeBase {
  kind: ProfileNodeKind;
  // Span and Location are stripped during AST transfer, but not during parsing.
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
export interface PrimitiveTypeNode extends ProfileASTNodeBase {
  kind: 'PrimitiveType';
  name: 'boolean' | 'number' | 'string';
}

/**
 * Name of a model type parsed from identifiers.
 *
 * This is the name of a user defined type (model).
 */
export interface ModelReferenceNode extends ProfileASTNodeBase {
  kind: 'ModelReference';
  name: string;
}
export type TypeName = PrimitiveTypeNode | ModelReferenceNode;

/** Construct of form: `Enum { values... }` */
export interface EnumDefinitionNode extends ProfileASTNodeBase {
  kind: 'EnumDefinition';
  values: (string | number | boolean)[];
}

/** Construct of form: `{ fields... }` */
export interface ObjectDefinitionNode extends ProfileASTNodeBase {
  kind: 'ObjectDefinition';
  fields: FieldDefinitionNode[];
}

/** Array type: `[type]` */
export interface ListDefinitionNode extends ProfileASTNodeBase {
  kind: 'ListDefinition';
  elementType: Type;
}

/**
 * Non-null assertion operator: `type!`
 *
 * Cannot be used on unions, but can be used on type aliases or on all union subtypes.
 */
export interface NonNullDefinitionNode extends ProfileASTNodeBase {
  kind: 'NonNullDefinition';
  // Should be `Exclude<Type, NonNullDefinitionNode | UnionDefinitionNode>` but it produces a TS(2502) error
  type:
    | TypeName
    | ObjectDefinitionNode
    | EnumDefinitionNode
    | ListDefinitionNode;
}

/** Construct of form: `type | type | ...` */
export interface UnionDefinitionNode extends ProfileASTNodeBase {
  kind: 'UnionDefinition';
  types: Exclude<Type, UnionDefinitionNode>[];
}

export type TypeDefinition =
  | ObjectDefinitionNode
  | EnumDefinitionNode
  | UnionDefinitionNode
  | ListDefinitionNode
  | NonNullDefinitionNode;

export type Type = TypeName | TypeDefinition;

// FIELDS //

/**
 * Construct of form: `ident: type` or `ident` that appear inside object model definitions
 */
export interface FieldDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'FieldDefinition';
  fieldName: string;
  type?: Type;
}

/**
 * Construct of form: `field ident: type`
 *
 * This assigns the name of `ident` to a type. All fields in the documents with the same name
 * will then share this type.
 */
export interface NamedFieldDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'NamedFieldDefinition';
  fieldName: string;
  type?: Type;
}

// MODEL //

/**
 * Construct of form: `model ident: TYPE` or `model ident { fields... }`
 *
 * This creates a new type in the document, which is assignable using the `ModelReferenceNode`.
 *
 * This can be used ranging from simple type alias `model Foo: String` to complex unions
 * and objects `model Bar: Foo! | Enum { 1, 2 } | { baz: Boolean }`
 */
export interface NamedModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'NamedModelDefinition';
  modelName: string;
  type?: Type;
}

// USECASE //

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
export interface UseCaseDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseDefinition';
  useCaseName: string;
  /** Usecase safety indicator */
  safety?: 'safe' | 'unsafe' | 'idempotent';
  input?: Type;
  result: Type;
  asyncResult?: Type;
  errors?: Type[];
}

// DOCUMENT //

/** `profile: string` */
export interface ProfileIdNode extends ProfileASTNodeBase {
  kind: 'ProfileId';
  profileId: string;
}
/**
 * The node containing document information at the top of the document.
 */
export interface ProfileNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'Profile';
  profileId: ProfileIdNode;
}
/** Node enclosing the whole document */
export interface ProfileDocumentNode extends ProfileASTNodeBase {
  kind: 'ProfileDocument';
  profile: ProfileNode;
  definitions: DocumentDefinition[];
}
export type DocumentDefinition =
  | UseCaseDefinitionNode
  | NamedFieldDefinitionNode
  | NamedModelDefinitionNode;
