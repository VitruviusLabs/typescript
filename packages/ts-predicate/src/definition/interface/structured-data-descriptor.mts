import type { Test } from "../type/test.mjs";
import type { StructuredDataPropertyDescriptor } from "../type/structured-data-property-descriptor.mjs";

type StructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: StructuredDataPropertyDescriptor<Type[Property]> | Test<NonNullable<Type>>;
};

export type { StructuredDataDescriptor };
