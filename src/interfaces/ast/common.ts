/** Recursively transforms `Source` into `Target` if it extends `Bound` */
export type RecursiveTransform<Source, Target, Bound> = Source extends Bound
  ? Target
  : { [k in keyof Source]: RecursiveTransform<Source[k], Target, Bound> };
