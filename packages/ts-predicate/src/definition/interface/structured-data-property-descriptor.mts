import type { Test } from "../type/test.mjs";

interface StructuredDataPropertyDescriptor<Type>
{
	nullable?: boolean;
	optional?: boolean;
	test: Test<NonNullable<Type>>;
}

export type { StructuredDataPropertyDescriptor };
