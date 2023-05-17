import type { TypeGuardPropertyDescriptor } from "./TypeGuardPropertyDescriptor.mjs";

type TypeGuardStructuredDataDescriptor<Type> = {
	[Property in keyof Type]-?: TypeGuardPropertyDescriptor<Type[Property]>;
};

export type { TypeGuardStructuredDataDescriptor };
