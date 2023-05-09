import { isInteger as guard } from "../TypeGuard/isInteger.js";

import { isNumber } from "./isNumber.js";

function isInteger(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("value is not an integer");
	}
}

export { isInteger };
