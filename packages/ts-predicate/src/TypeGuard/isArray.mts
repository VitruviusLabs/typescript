import { itemGuard } from "./utils/itemGuard.mjs";

import type { ArrayConstraints, Test } from "../types/_index.mjs";

function isArray<Type>(value: unknown, constraints?: ArrayConstraints<Type>): value is Array<Type>
{
	if (!Array.isArray(value))
	{
		return false;
	}

	if (constraints === undefined)
	{
		return true;
	}

	if (constraints.minLength !== undefined && value.length < constraints.minLength)
	{
		return false;
	}

	if (constraints.itemTest !== undefined)
	{
		const GUARD: Test<Type> = constraints.itemTest;

		return value.every(
			(item: unknown): boolean =>
			{
				return itemGuard(item, GUARD);
			}
		);
	}

	return true;
}

export { isArray };
