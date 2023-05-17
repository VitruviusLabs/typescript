import { isNumber as guard } from "../TypeGuard/isNumber.mjs";

function isNumber(value: unknown): asserts value is number
{
	if (!guard(value))
	{
		throw new Error("value is not a number");
	}
}

export { isNumber };
