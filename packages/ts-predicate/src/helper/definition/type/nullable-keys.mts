import type { NullableObject } from "./nullable-object.mjs";

type NullableKeys<T extends object, K extends keyof T> = NullableObject<Pick<T, K>> & Omit<T, K>;

export type { NullableKeys };
