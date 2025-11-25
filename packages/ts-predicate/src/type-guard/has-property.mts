import type { ObjectWithProperty } from "../definition/type/object-with-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { isNullish } from "../extended/nullish/predicate/type-guard/is-nullish.mjs";
import { itemGuard } from "./utils/item-guard.mjs";

function hasProperty<O extends object, K extends string | symbol>(value: O, property: K): value is ObjectWithProperty<O, K, unknown>;
function hasProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): value is ObjectWithProperty<O, K, T>;

function hasProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): value is ObjectWithProperty<O, K, T>
{
	if (!(property in value))
	{
		return false;
	}

	const property_value: unknown = Reflect.get(value, property);

	if (isNullish(property_value))
	{
		return false;
	}

	if (test === undefined)
	{
		return true;
	}

	return itemGuard<T>(property_value, test);
}

export { hasProperty };
