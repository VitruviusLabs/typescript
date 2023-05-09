import type { TypeGuardPropertyDescriptor } from "./TypeGuardPropertyDescriptor.js";

type TypeGuardStructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: TypeGuardPropertyDescriptor<Type[Property]>;
};

export type { TypeGuardStructuredDataDescriptor };
