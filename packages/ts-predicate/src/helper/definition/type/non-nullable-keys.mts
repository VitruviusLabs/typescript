import type { NonNullableObject } from "./non-nullable-object.mjs";

type NonNullableKeys<T extends object, K extends keyof T> = NonNullableObject<Pick<T, K>> & Omit<T, K>;

export type { NonNullableKeys };
