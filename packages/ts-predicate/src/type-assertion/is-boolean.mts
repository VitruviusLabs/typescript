import { isBoolean as guard } from "../type-guard/is-boolean.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isBoolean(value: unknown): asserts value is boolean
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a boolean.");
	}
}

export { isBoolean };
