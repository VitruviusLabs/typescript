import type { StructuredDataPropertyDescriptor } from "./structured-data-property-descriptor.mjs";

type StructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: StructuredDataPropertyDescriptor<Type[Property]>;
};

export type { StructuredDataDescriptor };
