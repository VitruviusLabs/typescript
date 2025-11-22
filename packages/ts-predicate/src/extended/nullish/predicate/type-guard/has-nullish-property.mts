import type { ObjectWithNullishProperty } from "../../definition/type/object-with-nullish-property.mjs";
import type { Test } from "../../../../definition/type/test.mjs";
import { isNullish } from "./is-nullish.mjs";
import { itemGuard } from "../../../../type-guard/utils/item-guard.mjs";

function hasNullishProperty<O extends object, K extends string | symbol>(value: O, property: K): value is ObjectWithNullishProperty<O, K, unknown>;
function hasNullishProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): value is ObjectWithNullishProperty<O, K, T>;

function hasNullishProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): value is ObjectWithNullishProperty<O, K, T>
{
	if (!(property in value))
	{
		return false;
	}

	if (test === undefined)
	{
		return true;
	}

	const property_value: unknown = Reflect.get(value, property);

	if (isNullish(property_value))
	{
		return true;
	}

	return itemGuard<T>(property_value, test);
}

export { hasNullishProperty };
