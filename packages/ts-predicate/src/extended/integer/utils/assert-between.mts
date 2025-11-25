import { assertInteger } from "../../../type-assertion/assert-integer.mjs";

function assertBetween(value: unknown, min: number, max: number): void
{
	assertInteger(value);

	if (value < min || max < value)
	{
		throw new RangeError(`Value ${value.toFixed(0)} is not between ${min.toFixed(0)} and ${max.toFixed(0)}.`);
	}
}

export { assertBetween };
