import type { ObjectWithNullableProperty } from "../definition/_index.mjs";
import { hasNullableProperty as guard } from "../type-guard/has-nullable-property.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function hasNullableProperty<O extends object, K extends string>(
	value: O,
	property: K
): asserts value is ObjectWithNullableProperty<O, K>
{
	if (!guard<O, K>(value, property))
	{
		throw new ValidationError(`The value must have a property "${property}".`);
	}
}

export { hasNullableProperty };
