import { isString as guard } from "../TypeGuard/isString.js";

function isString(value: unknown): asserts value is string
{
	if (!guard(value))
	{
		throw new Error("value is not a string");
	}
}

export { isString };
