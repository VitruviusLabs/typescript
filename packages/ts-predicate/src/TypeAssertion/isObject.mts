import { isObject as guard } from "../TypeGuard/isObject.mjs";

function isObject(value: unknown): asserts value is object
{
	if (!guard(value))
	{
		throw new Error("value is not an object");
	}
}

export { isObject };
