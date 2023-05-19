import { isDefined as guard } from "../TypeGuard/isDefined.mjs";

import { hasNullableProperty } from "./hasNullableProperty.mjs";

import type { ObjectWithProperty } from "../types/_index.mjs";

function hasProperty<O extends object, K extends string>(
	value: O,
	property: K,
): asserts value is ObjectWithProperty<O, K>
{
	hasNullableProperty<O, K>(value, property);

	if (!guard(value[property]))
	{
		throw new Error(`The property "${property}" must not have a nullish value (undefined, null, or NaN).`);
	}
}

export { hasProperty };
