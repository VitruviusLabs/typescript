import { isNumber } from "../type-guard/is-number.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertNumber(value: unknown): asserts value is number
{
	if (!isNumber(value))
	{
		throw new ValidationError("The value must be a number.");
	}
}

export { assertNumber };
