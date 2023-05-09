import type { TypeAssertionPropertyDescriptor } from "./TypeAssertionPropertyDescriptor.js";

type TypeAssertionStructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: TypeAssertionPropertyDescriptor<Type[Property]>;
};

export type { TypeAssertionStructuredDataDescriptor };
