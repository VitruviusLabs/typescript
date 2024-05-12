import type { ObjectWithNullableProperty } from "../definition/type/object-with-nullable-property.mjs";
import { hasNullableProperty } from "../type-guard/has-nullable-property.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertNullableProperty<O extends object, K extends string>(
	value: O,
	property: K
): asserts value is ObjectWithNullableProperty<O, K>
{
	if (!hasNullableProperty<O, K>(value, property))
	{
		throw new ValidationError(`The value must have a property "${property}".`);
	}
}

export { assertNullableProperty };
