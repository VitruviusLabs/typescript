import type { ObjectWithProperty } from "../definition/_index.mjs";
import { isDefined } from "../type-guard/is-defined.mjs";
import { assertNullableProperty } from "./assert-nullable-property.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertProperty<O extends object, K extends string>(
	value: O,
	property: K
): asserts value is ObjectWithProperty<O, K>
{
	assertNullableProperty<O, K>(value, property);

	if (!isDefined(value[property]))
	{
		throw new ValidationError(`The property "${property}" must not have a nullish value (undefined, null, or NaN).`);
	}
}

export { assertProperty };
