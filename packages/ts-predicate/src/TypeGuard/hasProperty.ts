import { hasNullableProperty } from "./hasNullableProperty.js";

import { isDefined } from "./isDefined.js";

import type { ObjectWithProperty } from "../Types/_index.js";

function hasProperty<O extends object, K extends string>(
	value: O,
	property: K,
): value is ObjectWithProperty<O, K>
{
	return hasNullableProperty(value, property) && isDefined(value[property]);
}

export { hasProperty };
