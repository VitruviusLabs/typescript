import type { ObjectWithProperty } from "../definition/type/object-with-property.mjs";
import type { Test } from "../definition/type/test.mjs";
import { isDefined } from "../type-guard/is-defined.mjs";
import { assertNullableProperty } from "./assert-nullable-property.mjs";
import { itemAssertion } from "./utils/item-assertion.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertProperty<O extends object, K extends string | symbol, T>(
	value: O,
	property: K,
	test?: Test<T>
): asserts value is ObjectWithProperty<O, K, T>
{
	assertNullableProperty<O, K>(value, property);

	if (!isDefined(value[property]))
	{
		throw new ValidationError(`The property "${property.toString()}" must not have a nullish value (undefined, null, or NaN).`);
	}

	if (test !== undefined)
	{
		itemAssertion<T>(value[property], test);
	}
}

export { assertProperty };
