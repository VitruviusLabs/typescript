import { isObject } from "../../TypeGuard/isObject.js";

import type { TypeAssertionPropertyDescriptor } from "../../index.js";

function isTypeAssertionStructuredDataDescriptor(value: unknown, property_name: string): asserts value is TypeAssertionPropertyDescriptor<unknown>
{
	if (!isObject(value))
	{
		throw new Error(`Invalid property descriptor for ${property_name}`);
	}
}

export { isTypeAssertionStructuredDataDescriptor };
