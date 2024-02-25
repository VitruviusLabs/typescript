import { isInteger as guard } from "../type-guard/is-integer.mjs";
import { isNumber } from "./is-number.mjs";

function isInteger(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("The value must be an integer.");
	}
}

export { isInteger };
