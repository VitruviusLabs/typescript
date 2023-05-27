import { buildRecordConstraints } from "../utils/buildRecordConstraints.mjs";

import { isObject } from "./isObject.mjs";

import { itemGuard } from "./utils/itemGuard.mjs";

import type { RecordConstraints, Test } from "../types/_index.mjs";

function isRecord<Type>(value: unknown, constraints?: RecordConstraints<Type> | Test<Type>): value is Record<string, Type>
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

	const CONSTRAINTS: RecordConstraints<Type> | undefined = buildRecordConstraints(constraints);

	if (CONSTRAINTS === undefined)
	{
		return true;
	}

	if (CONSTRAINTS.itemTest !== undefined)
	{
		const GUARD: Test<Type> = CONSTRAINTS.itemTest;

		return Object.values(value).every(
			(item: unknown): boolean =>
			{
				return itemGuard(item, GUARD);
			}
		);
	}

	return true;
}

export { isRecord };
