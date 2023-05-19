import type { Test } from "./Test.mjs";

interface StructuredDataPropertyDescriptor<Type>
{
	nullable?: boolean;
	optional?: boolean;
	test: Test<NonNullable<Type>>;
}

export type { StructuredDataPropertyDescriptor };
