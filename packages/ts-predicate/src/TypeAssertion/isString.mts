import { isString as guard } from "../TypeGuard/isString.mjs";

function isString(value: unknown): asserts value is string
{
	if (!guard(value))
	{
		throw new Error("The value must be a string.");
	}
}

export { isString };
