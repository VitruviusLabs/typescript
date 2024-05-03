import type { Test } from "../type/test.mjs";

interface StructuredDataRegularPropertyDescriptor<Type>
{
	test: Test<NonNullable<Type>>;
	nullable?: boolean;
	optional?: boolean;
	ignore?: boolean;
}

export type { StructuredDataRegularPropertyDescriptor };
