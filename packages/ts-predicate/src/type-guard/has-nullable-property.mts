import type { ObjectWithNullableProperty } from "../definition/type/object-with-nullable-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { isNonNullableNullish } from "../utils/is-non-nullable-nullish.mjs";
import { isNullable } from "./is-nullable.mjs";
import { itemGuard } from "./utils/item-guard.mjs";

function hasNullableProperty<O extends object, K extends string | symbol>(value: O, property: K): value is ObjectWithNullableProperty<O, K, unknown>;
function hasNullableProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): value is ObjectWithNullableProperty<O, K, T>;

function hasNullableProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): value is ObjectWithNullableProperty<O, K, T>
{
	if (!(property in value))
	{
		return false;
	}

	const property_value: unknown = Reflect.get(value, property);

	if (isNonNullableNullish(property_value))
	{
		return false;
	}

	if (isNullable(property_value))
	{
		return true;
	}

	if (test === undefined)
	{
		return true;
	}

	return itemGuard<T>(property_value, test);
}

export { hasNullableProperty };
