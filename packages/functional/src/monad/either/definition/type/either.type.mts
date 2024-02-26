import type { LeftInterface } from "../interface/left.interface.mjs";
import type { RightInterface } from "../interface/right.interface.mjs";

type EitherType<A, B> = LeftInterface<A> | RightInterface<B>;

export type { EitherType };
