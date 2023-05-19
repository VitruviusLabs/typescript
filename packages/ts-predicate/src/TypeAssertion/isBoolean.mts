import { isBoolean as guard } from "../TypeGuard/isBoolean.mjs";

function isBoolean(value: unknown): asserts value is boolean
{
	if (!guard(value))
	{
		throw new Error("The value must be a boolean.");
	}
}

export { isBoolean };
