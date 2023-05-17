import { isFiniteNumber as guard } from "../TypeGuard/isFiniteNumber.mjs";

import { isNumber } from "./isNumber.mjs";

function isFiniteNumber(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("value is not a finite number");
	}
}

export { isFiniteNumber };
