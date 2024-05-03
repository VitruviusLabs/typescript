import { isBoolean } from "../type-guard/is-boolean.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertBoolean(value: unknown): asserts value is boolean
{
	if (!isBoolean(value))
	{
		throw new ValidationError("The value must be a boolean.");
	}
}

export { assertBoolean };
