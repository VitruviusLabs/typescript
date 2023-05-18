import { isFiniteNumber as guard } from "../TypeGuard/isFiniteNumber.mjs";

import { isNumber } from "./isNumber.mjs";

function isFiniteNumber(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("The value must be a finite number.");
	}
}

export { isFiniteNumber };
