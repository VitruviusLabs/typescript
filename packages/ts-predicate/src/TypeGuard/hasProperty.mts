import { hasNullableProperty } from "./hasNullableProperty.mjs";

import { isDefined } from "./isDefined.mjs";

import type { ObjectWithProperty } from "../types/_index.mjs";

function hasProperty<O extends object, K extends string>(
	value: O,
	property: K,
): value is ObjectWithProperty<O, K>
{
	return hasNullableProperty(value, property) && isDefined(value[property]);
}

export { hasProperty };
