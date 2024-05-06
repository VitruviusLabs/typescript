import { isString } from "../type-guard/is-string.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertString(value: unknown): asserts value is string
{
	if (!isString(value))
	{
		throw new ValidationError("The value must be a string.");
	}
}

export { assertString };
