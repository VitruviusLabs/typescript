import type { TypeGuardTest } from "./TypeGuardTest.js";

interface ArrayConstraints<Type>
{
	minLength?: number;
	itemGuard?: TypeGuardTest<Type>;
}

export type { ArrayConstraints };
