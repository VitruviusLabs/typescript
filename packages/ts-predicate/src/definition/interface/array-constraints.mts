import type { Test } from "../type/test.mjs";

interface ArrayConstraints<Type>
{
	itemTest?: Test<Type>;
	minLength?: number;
}

export type { ArrayConstraints };
