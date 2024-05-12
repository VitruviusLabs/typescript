import type { ObjectWithProperty } from "../definition/type/object-with-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { hasNullableProperty } from "./has-nullable-property.mjs";
import { isDefined } from "./is-defined.mjs";
import { itemGuard } from "./utils/item-guard.mjs";

function hasProperty<O extends object, K extends string, T>(
	value: O,
	property: K,
	test?: Test<T>
): value is ObjectWithProperty<O, K, T>
{
	return (
		hasNullableProperty(value, property)
		&& isDefined(value[property])
		&& (test === undefined || itemGuard<T>(value[property], test))
	);
}

export { hasProperty };
