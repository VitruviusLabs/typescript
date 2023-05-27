import { buildArrayConstraints } from "../utils/buildArrayConstraints.mjs";

import { itemGuard } from "./utils/itemGuard.mjs";

import type { ArrayConstraints, Test } from "../types/_index.mjs";

function isArray<Type>(value: unknown, constraints?: ArrayConstraints<Type> | Test<Type>): value is Array<Type>
{
	if (!Array.isArray(value))
	{
		return false;
	}

	const CONSTRAINTS: ArrayConstraints<Type> | undefined = buildArrayConstraints(constraints);

	if (CONSTRAINTS === undefined)
	{
		return true;
	}

	if (CONSTRAINTS.minLength !== undefined && value.length < CONSTRAINTS.minLength)
	{
		return false;
	}

	if (CONSTRAINTS.itemTest !== undefined)
	{
		const GUARD: Test<Type> = CONSTRAINTS.itemTest;

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
