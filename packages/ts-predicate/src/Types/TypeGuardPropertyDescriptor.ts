import type { TypeGuardTest } from "./TypeGuardTest.js";

interface TypeGuardPropertyDescriptor<Type>
{
	nullable?: boolean;
	optional?: boolean;
	test: TypeGuardTest<NonNullable<Type>>;
}

export type { TypeGuardPropertyDescriptor };
