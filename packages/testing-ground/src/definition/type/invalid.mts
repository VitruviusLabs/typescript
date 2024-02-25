import type { AnythingBut } from "./anything-but.mjs";

type Invalid<T> = {
	[K in keyof T]-?: AnythingBut<T[K]>;
};

export type { Invalid };
