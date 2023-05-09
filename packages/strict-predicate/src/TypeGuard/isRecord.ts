import { isObject } from "./isObject.js";

import type { TypeGuardTest } from "../Types/_index.js";

function isRecord<Type>(
	value: unknown,
	item_guard?: TypeGuardTest<Type>
): value is Record<string, Type>
{
	if (!isObject(value))
	{
		return false;
	}

	const PROTO: unknown = Object.getPrototypeOf(value);

	if (PROTO !== null && PROTO !== Object.prototype)
	{
		return false;
	}

	if (item_guard !== undefined && !Object.values(value).every(item_guard))
	{
		return false;
	}

	return true;
}

export { isRecord };
