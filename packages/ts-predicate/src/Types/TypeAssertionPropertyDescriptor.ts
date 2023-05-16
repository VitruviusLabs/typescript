import type { TypeAssertionTest } from "./TypeAssertionTest.js";

interface TypeAssertionPropertyDescriptor<Type>
{
	nullable?: boolean;
	optional?: boolean;
	test: TypeAssertionTest<NonNullable<Type>>;
}

export type { TypeAssertionPropertyDescriptor };
