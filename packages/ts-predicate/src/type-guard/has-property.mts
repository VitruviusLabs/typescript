import { hasNullableProperty } from "./has-nullable-property.mjs";
import { isDefined } from "./is-defined.mjs";
import type { ObjectWithProperty } from "../definition/_index.mjs";

function hasProperty<O extends object, K extends string>(
	value: O,
	property: K
): value is ObjectWithProperty<O, K>
{
	return hasNullableProperty(value, property) && isDefined(value[property]);
}

export { hasProperty };
