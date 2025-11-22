import type { Nullish } from "./nullish.mjs";

// eslint-disable-next-line @ts/consistent-indexed-object-style -- Such signature cannot be expressed as a record
type ObjectWithNullishProperty<O extends object, K extends string | symbol, T> = O & {
	[property in K]: Nullish<T>;
};

export type { ObjectWithNullishProperty };
