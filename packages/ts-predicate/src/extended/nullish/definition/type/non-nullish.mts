import type { NullishValues } from "./nullish-values.mjs";

type NonNullish<T> = Exclude<T, NullishValues>;

export type { NonNullish };
