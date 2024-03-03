import { isNumber as guard } from "../type-guard/is-number.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isNumber(value: unknown): asserts value is number
{
	if (!guard(value))
	{
		throw new ValidationError("The value must be a number.");
	}
}

export { isNumber };
