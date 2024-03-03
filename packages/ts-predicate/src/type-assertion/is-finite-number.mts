import { isFiniteNumber as guard } from "../type-guard/is-finite-number.mjs";
import { isNumber } from "./is-number.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function isFiniteNumber(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new ValidationError("The value must be a finite number.");
	}
}

export { isFiniteNumber };
