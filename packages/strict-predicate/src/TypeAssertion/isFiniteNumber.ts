import { isFiniteNumber as guard } from "../TypeGuard/isFiniteNumber.js";

import { isNumber } from "./isNumber.js";

function isFiniteNumber(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("value is not a finite number");
	}
}

export { isFiniteNumber };
