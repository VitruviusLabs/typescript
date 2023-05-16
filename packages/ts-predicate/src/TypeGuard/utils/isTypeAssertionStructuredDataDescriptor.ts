import { isObject } from "../isObject.js";

import type { TypeGuardPropertyDescriptor } from "../../index.js";

function isTypeGuardPropertyDescriptor(value: unknown): value is TypeGuardPropertyDescriptor<unknown>
{
	return isObject(value);
}

export { isTypeGuardPropertyDescriptor };
