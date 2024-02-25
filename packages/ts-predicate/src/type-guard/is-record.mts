import { buildRecordConstraints } from "../utils/build-record-constraints.mjs";
import { isObject } from "./is-object.mjs";
import { itemGuard } from "./utils/item-guard.mjs";
import type { RecordConstraints, Test } from "../definition/_index.mjs";

function isRecord<Type>(value: unknown, constraints?: RecordConstraints<Type> | Test<Type>): value is Record<string, Type>
{
	if (!isObject(value))
	{
		return false;
	}

	const PROTO: unknown = Object.getPrototypeOf(value);

	if (PROTO !== Object.prototype && PROTO !== null)
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
