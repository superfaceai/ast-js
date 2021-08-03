import { Location, Span } from './source';

// BASE //

export type ProfileNodeKind =
  // TYPES
  | 'PrimitiveTypeName'
  | 'ModelTypeName'
  | 'EnumDefinition'
  | 'ObjectDefinition'
  | 'ListDefinition'
  | 'NonNullDefinition'
  | 'UnionDefinition'
  // FIELDS
  | 'EnumValue'
  | 'FieldDefinition'
  | 'NamedFieldDefinition'
  // MODELS
  | 'NamedModelDefinition'
  // USECASE
  | 'UseCaseSlotDefinition'
  | 'UseCaseDefinition'
  // DOCUMENT
  | 'ProfileHeader'
  | 'ProfileDocument';

export interface ProfileASTNodeBase {
  kind: ProfileNodeKind;
  // Span and Location are stripped during AST transfer, but not during parsing.
  span?: Span | undefined;
  location?: Location | undefined;
}

/** Node preceded by documenting string literal */
export interface DocumentedNode {
  title?: string | undefined;
  description?: string | undefined;
}

// TYPES //

/** From keywords: `boolean`, `number` and `string` */
export interface PrimitiveTypeNameNode extends ProfileASTNodeBase {
  kind: 'PrimitiveTypeName';
  name: 'boolean' | 'number' | 'string';
}

/**
 * Name of a model type parsed from identifiers.
 *
 * This is the name of a user defined type (model).
 */
export interface ModelTypeNameNode extends ProfileASTNodeBase {
  kind: 'ModelTypeName';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   **/
  name: string;
}
export type TypeName = PrimitiveTypeNameNode | ModelTypeNameNode;

/** Construct of form: `enum { values... }` */
export interface EnumDefinitionNode extends ProfileASTNodeBase {
  kind: 'EnumDefinition';
  values: EnumValueNode[];
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
 * Construct found as enum value.
 */
export interface EnumValueNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'EnumValue';
  value: string | number | boolean;
}

/**
 * Construct of form: `ident type` or `ident` that appear inside object model definitions
 */
export interface FieldDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'FieldDefinition';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   **/
  fieldName: string;
  /** Non-required fields don't have to be present at all */
  required: boolean;
  type?: Type | undefined;
}

/**
 * Construct of form: `field ident type`
 *
 * This assigns the name of `ident` to a type. All fields in the documents with the same name
 * will then share this type.
 */
export interface NamedFieldDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'NamedFieldDefinition';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   **/
  fieldName: string;
  type?: Type | undefined;
}

// MODEL //

/**
 * Construct of form: `model ident type` or `model ident { fields... }`
 *
 * This creates a new type in the document, which is assignable using the `ModelReferenceNode`.
 *
 * This can be used ranging from simple type alias `model Foo string` to complex unions
 * and objects `model Bar Foo! | enum { ONE = 1, TWO = 2 } | { baz boolean }`
 */
export interface NamedModelDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'NamedModelDefinition';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   **/
  modelName: string;
  type?: Type | undefined;
}

// USECASE //

/**
 * Named slot definition for usecases.
 *
 * The point of this node is so that the usecase slots (`input`, `result`, `async result` and `error`) can have proper spans and documentation.
 */
export interface UseCaseSlotDefinitionNode<T extends Type = Type>
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseSlotDefinition';
  type?: T | undefined;
}

/**
* Construct of form:
```
usecase ident safety {
  input {
    ...fields
  }
  result type
  async result type
  error type
}
```
*/
export interface UseCaseDefinitionNode
  extends ProfileASTNodeBase,
    DocumentedNode {
  kind: 'UseCaseDefinition';
  /**
   * @pattern require('./utils').IDENTIFIER_RE_SOURCE
   **/
  useCaseName: string;
  /** Usecase safety indicator */
  safety?: 'safe' | 'unsafe' | 'idempotent' | undefined;
  input?: UseCaseSlotDefinitionNode<ObjectDefinitionNode> | undefined;
  result?: UseCaseSlotDefinitionNode | undefined;
  asyncResult?: UseCaseSlotDefinitionNode | undefined;
  error?: UseCaseSlotDefinitionNode | undefined;
}

// DOCUMENT //

/**
 * The node containing document information.
 */
export interface ProfileHeaderNode extends ProfileASTNodeBase, DocumentedNode {
  kind: 'ProfileHeader';
  /**
   * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
   **/
  scope?: string | undefined;
  /**
   * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
   **/
  name: string;
  version: {
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    major: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    minor: number;
    /**
     * @TJS-minimum 0
     * @TJS-type integer
     **/
    patch: number;
    /**
     * @pattern require('./utils').DOCUMENT_NAME_RE_SOURCE
     **/
    label?: string | undefined;
  };
}

/** Node enclosing the whole document */
export interface ProfileDocumentNode extends ProfileASTNodeBase {
  kind: 'ProfileDocument';
  header: ProfileHeaderNode;
  definitions: DocumentDefinition[];
}

export type DocumentDefinition =
  | UseCaseDefinitionNode
  | NamedFieldDefinitionNode
  | NamedModelDefinitionNode;

export type ProfileASTNode =
  | EnumDefinitionNode
  | EnumValueNode
  | FieldDefinitionNode
  | ListDefinitionNode
  | ModelTypeNameNode
  | NamedFieldDefinitionNode
  | NamedModelDefinitionNode
  | NonNullDefinitionNode
  | ObjectDefinitionNode
  | PrimitiveTypeNameNode
  | ProfileDocumentNode
  | ProfileHeaderNode
  | UnionDefinitionNode
  | UseCaseDefinitionNode
  | UseCaseSlotDefinitionNode;
