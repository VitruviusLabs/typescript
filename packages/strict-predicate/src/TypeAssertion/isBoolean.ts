import { isBoolean as guard } from "../TypeGuard/isBoolean.js";

function isBoolean(value: unknown): asserts value is boolean
{
	if (!guard(value))
	{
		throw new Error("value is not a boolean");
	}
}

export { isBoolean };
