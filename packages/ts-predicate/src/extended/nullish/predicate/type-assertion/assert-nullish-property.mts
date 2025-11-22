import type { ObjectWithNullishProperty } from "../../definition/type/object-with-nullish-property.mjs";
import type { Test } from "../../../../definition/type/test.mjs";
import { hasNullishProperty } from "../type-guard/has-nullish-property.mjs";
import { isNullish } from "../type-guard/is-nullish.mjs";
import { itemAssertion } from "../../../../type-assertion/utils/item-assertion.mjs";
import { ValidationError } from "../../../../type-assertion/utils/validation-error.mjs";

function assertNullishProperty<O extends object, K extends string | symbol>(value: O, property: K): asserts value is ObjectWithNullishProperty<O, K, unknown>;
function assertNullishProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): asserts value is ObjectWithNullishProperty<O, K, T>;

function assertNullishProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): asserts value is ObjectWithNullishProperty<O, K, T>
{
	if (!hasNullishProperty(value, property))
	{
		throw new ValidationError(`The value must have a property "${property.toString()}".`);
	}

	const property_value: unknown = value[property];

	if (isNullish(property_value))
	{
		return;
	}

	if (test !== undefined)
	{
		itemAssertion(property_value, test);
	}
}

export { assertNullishProperty };
