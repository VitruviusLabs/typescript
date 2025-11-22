import type { Nullable } from "./nullable.mjs";

// eslint-disable-next-line @ts/consistent-indexed-object-style -- Such signature cannot be expressed as a record
type ObjectWithNullableProperty<O extends object, K extends string | symbol, T> = O & {
	[property in K]: Nullable<T>;
};

export type { ObjectWithNullableProperty };
