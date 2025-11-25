import type { ObjectWithProperty } from "../definition/type/object-with-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { assertNullishProperty } from "../extended/nullish/predicate/type-assertion/assert-nullish-property.mjs";
import { isNullish } from "../extended/nullish/predicate/type-guard/is-nullish.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertProperty<O extends object, K extends string | symbol>(value: O, property: K): asserts value is ObjectWithProperty<O, K, unknown>;
function assertProperty<O extends object, K extends string | symbol, T>(value: O, property: K, test: Test<T>): asserts value is ObjectWithProperty<O, K, T>;

function assertProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): asserts value is ObjectWithProperty<O, K, T>
{
	assertNullishProperty(value, property);

	const scoped_value: unknown = Reflect.get(value, property);

	if (isNullish(scoped_value))
	{
		throw new ValidationError(`The property "${property.toString()}" must not have a nullish value (undefined, null, NaN, or NoValue).`);
	}

	if (test !== undefined)
	{
		itemAssertion<T>(scoped_value, test);
	}
}

export { assertProperty };
