import type { Test } from "./Test.mjs";

interface ArrayConstraints<Type>
{
	minLength?: number;
	itemTest?: Test<Type>;
}

export type { ArrayConstraints };
