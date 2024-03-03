import { isString as guard } from "../type-guard/is-string.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isString(value: unknown): asserts value is string
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a string.");
	}
}

export { isString };
