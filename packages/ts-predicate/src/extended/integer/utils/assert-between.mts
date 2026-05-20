import { assertInteger } from "../../../type-assertion/assert-integer.mjs";
import { ValidationError } from "../../../type-assertion/utils/validation-error.mjs";

function assertBetween(value: unknown, min: number, max: number): void
{
	assertInteger(value);

	if (value < min || max < value)
	{
		throw new ValidationError(`Value ${value.toFixed(0)} is not between ${min.toFixed(0)} and ${max.toFixed(0)}.`);
	}
}

export { assertBetween };
