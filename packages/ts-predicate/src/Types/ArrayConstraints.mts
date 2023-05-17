import type { TypeGuardTest } from "./TypeGuardTest.mjs";

interface ArrayConstraints<Type>
{
	minLength?: number;
	itemGuard?: TypeGuardTest<Type>;
}

export type { ArrayConstraints };
