import { isInteger as guard } from "../TypeGuard/isInteger.mjs";

import { isNumber } from "./isNumber.mjs";

function isInteger(value: unknown): asserts value is number
{
	isNumber(value);

	if (!guard(value))
	{
		throw new Error("value is not an integer");
	}
}

export { isInteger };
