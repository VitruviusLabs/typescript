import { isArray as guard } from "../TypeGuard/isArray.js";

import type { ArrayConstraints } from "../Types/_index.js";

function isArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): asserts value is Array<Type>
{
	if (!guard(value))
	{
		throw new Error("value is not an array");
	}

	if (constraints === undefined)
	{
		return;
	}

	if (constraints.minLength !== undefined && value.length < constraints.minLength)
	{
		throw new Error("value is an array, but it doesn't have enough items");
	}

	if (constraints.itemGuard !== undefined && !value.every(constraints.itemGuard))
	{
		throw new Error("value is an array, but some items are invalid");
	}
}

export { isArray };
