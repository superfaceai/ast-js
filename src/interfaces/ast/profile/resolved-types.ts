import { ModelTypeNameNode, Type } from './ast';
import { RecursiveTransform } from '../common';

/**
 * Recursive sentinel node that marks circular reference detected while resolving reference type.
 *
 * The `name` field of this node names a resolved reference that appears as one of its ancestors in the tree:
 * ```
 * {
 *   kind: 'ModelTypeName',
 *   name: 'Foo',
 *   type: {
 *     kind: 'ObjectDefinition',
 *     fields: [
 *       {
 *         kind: 'FieldDefinition',
 *         type: {
 *           kind: 'ModelTypeName',
 *           name: 'Foo',
 *           type: 'recursive'
 *         }
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export interface RecursiveModelTypeNameNode extends ModelTypeNameNode {
  type: 'recursive'; // TODO: Talk about this: Is this needed? Is this more convenient or should this be an object with a custom kind property?
}

/**
 * Model type name reference that is resolved to a type. Circular references are marked by `RecursiveModelTypeNameNode`.
 */
export interface ResolvedModelTypeNameNode extends ModelTypeNameNode {
  type: RecursiveTransform<
    Type,
    ResolvedModelTypeNameNode | RecursiveModelTypeNameNode,
    ModelTypeNameNode
  >;
}

/** Transforms all `ModelTypeNameNode`s into `ResolvedModelTypeNameNode` recursively. */
export type ResolvedReferenceTypes<T> = RecursiveTransform<
  T,
  ResolvedModelTypeNameNode,
  ModelTypeNameNode
>;
