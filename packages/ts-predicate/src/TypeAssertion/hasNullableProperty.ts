import { hasNullableProperty as guard } from "../TypeGuard/hasNullableProperty.js";

import type { ObjectWithNullableProperty } from "../Types/_index.js";

function hasNullableProperty<O extends object, K extends string>(
	value: O,
	property: K,
): asserts value is ObjectWithNullableProperty<O, K>
{
	if (!guard<O, K>(value, property))
	{
		throw new Error(`value does not have a property named "${property}"`);
	}
}

export { hasNullableProperty };
