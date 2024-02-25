import { isString as guard } from "../type-guard/is-string.mjs";

function isString(value: unknown): asserts value is string
{
	if (!guard(value))
	{
		throw new Error("The value must be a string.");
	}
}

export { isString };
