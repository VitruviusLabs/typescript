import type { Assertor } from "./assertor.mjs";
import type { Guard } from "./guard.mjs";

type Test<Type> = Assertor<Type> | Guard<Type>;

export type { Test };
