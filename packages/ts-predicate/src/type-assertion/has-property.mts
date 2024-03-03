import type { ObjectWithProperty } from "../definition/_index.mjs";
import { isDefined as guard } from "../type-guard/is-defined.mjs";
import { hasNullableProperty } from "./has-nullable-property.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function hasProperty<O extends object, K extends string>(
	value: O,
	property: K
): asserts value is ObjectWithProperty<O, K>
{
	hasNullableProperty<O, K>(value, property);

	if (!guard(value[property]))
	{
		throw new ValidationError(`The property "${property}" must not have a nullish value (undefined, null, or NaN).`);
	}
}

export { hasProperty };
