import { isNullish } from "../type-guard/is-nullish.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertNullish<Type>(value: Type): asserts value is Type & (null | undefined)
{
	if (!isNullish(value))
	{
		throw new ValidationError("The value must be nullish (undefined, null, or NaN).");
	}
}

export { assertNullish };
