import type { TypeAssertionTest } from "./TypeAssertionTest.mjs";

interface TypeAssertionPropertyDescriptor<Type>
{
	nullable?: boolean;
	optional?: boolean;
	test: TypeAssertionTest<NonNullable<Type>>;
}

export type { TypeAssertionPropertyDescriptor };
