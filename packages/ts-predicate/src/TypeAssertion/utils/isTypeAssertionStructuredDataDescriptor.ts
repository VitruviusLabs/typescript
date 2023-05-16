import { isObject } from "../../TypeGuard/isObject.js";

import type { TypeAssertionPropertyDescriptor } from "../../index.js";

function isTypeAssertionStructuredDataDescriptor(value: unknown): value is TypeAssertionPropertyDescriptor<unknown>
{
	return isObject(value);
}

export { isTypeAssertionStructuredDataDescriptor };
