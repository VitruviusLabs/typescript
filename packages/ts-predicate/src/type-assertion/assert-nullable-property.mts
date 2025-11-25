import type { ObjectWithNullableProperty } from "../definition/type/object-with-nullable-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { hasNullishProperty } from "../extended/nullish/predicate/type-guard/has-nullish-property.mjs";
import { isNonNullableNullish } from "../utils/is-non-nullable-nullish.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";
import { isNullable } from "../type-guard/is-nullable.mjs";

function assertNullableProperty<O extends object, K extends string | symbol>(value: O, property: K): asserts value is ObjectWithNullableProperty<O, K, unknown>;
function assertNullableProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): asserts value is ObjectWithNullableProperty<O, K, T>;

function assertNullableProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): asserts value is ObjectWithNullableProperty<O, K, T>
{
	if (!hasNullishProperty(value, property))
	{
		throw new ValidationError(`The value must have a property "${property.toString()}".`);
	}

	const property_value: unknown = value[property];

	if (isNonNullableNullish(property_value))
	{
		throw new ValidationError(`The property "${property.toString()}" can be null or undefined, but cannot be NaN or NoValue.`);
	}

	if (isNullable(property_value))
	{
		return;
	}

	if (test !== undefined)
	{
		itemAssertion(property_value, test);
	}
}

export { assertNullableProperty };
