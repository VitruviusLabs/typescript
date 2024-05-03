import { isInteger } from "../type-guard/is-integer.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertInteger(value: unknown): asserts value is number
{
	if (!isInteger(value))
	{
		throw new ValidationError("The value must be an integer.");
	}
}

export { assertInteger };
