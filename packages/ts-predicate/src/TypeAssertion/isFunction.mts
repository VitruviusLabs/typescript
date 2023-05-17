import { isFunction as guard } from "../TypeGuard/isFunction.mjs";

// eslint-disable-next-line @typescript-eslint/ban-types -- Allow proper function inference
function isFunction(value: unknown): asserts value is Function
{
	if (!guard(value))
	{
		throw new Error("value is not a function");
	}
}

export { isFunction };
