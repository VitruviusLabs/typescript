import type { ValidationInterface } from "./validation.interface.mjs";

interface ValidInterface<A> extends ValidationInterface<A>
{
	readonly errors: Readonly<[]>;
}

export type { ValidInterface };
