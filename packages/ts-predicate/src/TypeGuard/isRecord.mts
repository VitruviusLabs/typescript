import { isObject } from "./isObject.mjs";

import { itemGuard } from "./utils/itemGuard.mjs";

import type { Test } from "../types/_index.mjs";

function isRecord<Type>(value: unknown, item_test?: Test<Type>): value is Record<string, Type>
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

	if (item_test !== undefined)
	{
		return Object.values(value).every(
			(item: unknown): boolean =>
			{
				return itemGuard(item, item_test);
			}
		);
	}

	return true;
}

export { isRecord };
