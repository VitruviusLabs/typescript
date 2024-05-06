import { isFiniteNumber } from "../type-guard/is-finite-number.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertFiniteNumber(value: unknown): asserts value is number
{
	if (!isFiniteNumber(value))
	{
		throw new ValidationError("The value must be a finite number.");
	}
}

export { assertFiniteNumber };
