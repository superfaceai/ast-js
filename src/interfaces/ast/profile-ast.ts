import { Location, Span } from './source';

// BASE //

export type ProfileNodeKind =
  // TYPES
  | 'ScalarTypeNode'
  | 'EnumModelDefinitionNode'
  | 'ModelReferenceNode'
  | 'ObjectModelDefinitionNode'
  | 'ListTypeNode'
  | 'NonNullTypeNode'
  | 'UnionModelDefinitionNode'
  // FIELDS
  | 'FieldDefinitionNode'
  | 'NamedFieldDefinitionNode'
  // MODELS
  | 'NamedModelDefinitionNode'
  // USECASE
  | 'UseCaseDefinitionNode'
  // DOCUMENT
  | 'ProfileIdNode'
  | 'ProfileNode'
  | 'ProfileDocumentNode';

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
export interface ScalarTypeNode extends ProfileASTNodeBase {
  kind: 'ScalarTypeNode';
  name: 'boolean' | 'number' | 'string';
}

/**
 * Name of a model type parsed from identifiers.
 *
 * This is the name of a user defined type (model).
 */
export interface ModelReferenceNode extends ProfileASTNodeBase {
  kind: 'ModelReferenceNode';
  name: string;
}

/** Construct of form: `enum { values... }` */
export interface EnumModelDefinitionNode extends ProfileASTNodeBase {
  kind: 'EnumModelDefinitionNode';
  enumValues: (string | number | boolean)[];
}

/** Construct of form: `{ fields... }` */
export interface ObjectModelDefinitionNode extends ProfileASTNodeBase {
  kind: 'ObjectModelDefinitionNode';
  fields: FieldDefinitionNode[];
}

/** Array type: `[type]` */
export interface ListTypeNode extends ProfileASTNodeBase {
  kind: 'ListTypeNode';
  type: Type;
}

/**
 * Non-null assertion operator: `type!`
 *
 * Cannot be used on unions, but can be used on type aliases or on all union subtypes.
 */
export interface NonNullTypeNode extends ProfileASTNodeBase {
  kind: 'NonNullTypeNode';
  // Should be `Exclude<Type, NonNullTypeNode | UnionTypeNode>` but it produces a TS(2502) error
  type:
    | ScalarTypeNode
    | EnumModelDefinitionNode
    | ModelReferenceNode
    | ObjectModelDefinitionNode
    | ListTypeNode;
}

/** Construct of form: `type | type | ...` */
export interface UnionModelDefinitionNode extends ProfileASTNodeBase {
  kind: 'UnionModelDefinitionNode';
  types: Exclude<Type, UnionModelDefinitionNode>[];
}

export type ModelDefinitionNode = 
  | UnionModelDefinitionNode
  | EnumModelDefinitionNode
  | ObjectModelDefinitionNode
;

export type Type =
  | ModelDefinitionNode
  | ScalarTypeNode
  | ModelReferenceNode
  | ListTypeNode
  | NonNullTypeNode;

// FIELDS //

/**
 * Construct of form: `ident: type` or `ident` that appear inside object model definitions
 */
export interface FieldDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'FieldDefinitionNode';
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
  kind: 'NamedFieldDefinitionNode';
  fieldName: string;
  type?: Type;
}

// MODEL //

/**
 * Construct of form: `model ident: TYPE` or `model ident { fields... }`
 *
 * This creates a new type in the document, which is assignable using the `ModelTypeName` construct.
 *
 * This can be used ranging from simple type alias `model Foo: String` to complex unions
 * and objects `model Bar: Foo! | Enum { 1, 2 } | { baz: Boolean }`
 */
export interface NamedModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'NamedModelDefinitionNode';
  modelName: ModelReferenceNode;
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
export interface ProfileUseCaseDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseDefinitionNode';
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
export interface ProfileProfileIdNode extends ProfileASTNodeBase {
  kind: 'ProfileIdNode';
  profileId: string;
}
/**
 * The node containing document information at the top of the document.
 */
export interface ProfileNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'ProfileNode';
  profileId: ProfileProfileIdNode;
}
/** Node enclosing the whole document */
export interface ProfileDocumentNode extends ProfileASTNodeBase {
  kind: 'ProfileDocumentNode';
  profile: ProfileNode;
  definitions: DocumentDefinition[];
}
export type DocumentDefinition =
  | ProfileUseCaseDefinitionNode
  | NamedFieldDefinitionNode
  | NamedModelDefinitionNode;
