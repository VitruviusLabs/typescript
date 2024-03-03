import { isDefined as guard } from "../type-guard/is-defined.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isDefined<Type>(value: Type): asserts value is NonNullable<Type>
{
	if (!guard(value))
	{
		throw new ValidationError("The value must not be nullish (undefined, null, or NaN).");
	}
}

export { isDefined };
