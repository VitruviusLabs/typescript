import { isRecord as guard } from "../TypeGuard/isRecord.js";

import type { TypeGuardTest } from "../Types/_index.js";

function isRecord<Type>(
	value: unknown,
	item_guard?: TypeGuardTest<Type>
): asserts value is Record<string, Type>
{
	if (!guard(value))
	{
		throw new Error("value is not a record");
	}

	if (item_guard !== undefined && !Object.values(value).every(item_guard))
	{
		throw new Error("value is a record, but some entries are invalid");
	}
}

export { isRecord };
