import { isDefined } from "../type-guard/is-defined.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertDefined<Type>(value: Type): asserts value is NonNullable<Type>
{
	if (!isDefined(value))
	{
		throw new ValidationError("The value must not be nullish (undefined, null, or NaN).");
	}
}

export { assertDefined };
