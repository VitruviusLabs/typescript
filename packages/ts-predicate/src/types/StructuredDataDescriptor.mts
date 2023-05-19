import type { StructuredDataPropertyDescriptor } from "./StructuredDataPropertyDescriptor.mjs";

type StructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: StructuredDataPropertyDescriptor<Type[Property]>;
};

export type { StructuredDataDescriptor };
