import type { AnythingBut } from "./AnythingBut.mjs";

type Invalid<T> = {
	[K in keyof T]-?: AnythingBut<T[K]>;
};

export type { Invalid };
