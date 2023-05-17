import type { TypeAssertionPropertyDescriptor } from "./TypeAssertionPropertyDescriptor.mjs";

type TypeAssertionStructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: TypeAssertionPropertyDescriptor<Type[Property]>;
};

export type { TypeAssertionStructuredDataDescriptor };
