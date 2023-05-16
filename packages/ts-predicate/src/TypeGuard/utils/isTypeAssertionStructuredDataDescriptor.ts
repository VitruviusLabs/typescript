import { isObject } from "../isObject.js";

import type { TypeGuardPropertyDescriptor } from "../../index.js";

function isTypeGuardPropertyDescriptor(value: unknown, property_name: string): asserts value is TypeGuardPropertyDescriptor<unknown>
{
	if (!isObject(value))
	{
		throw new Error(`Invalid property descriptor for ${property_name}`);
	}
}

export { isTypeGuardPropertyDescriptor };
