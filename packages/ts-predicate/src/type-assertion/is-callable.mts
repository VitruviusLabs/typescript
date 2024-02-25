import { isCallable as guard } from "../type-guard/is-callable.mjs";

// eslint-disable-next-line @typescript-eslint/ban-types -- Allow proper function inference
function isCallable(value: unknown): asserts value is Function
{
	if (!guard(value))
	{
		throw new Error("The value must be a callable.");
	}
}

export { isCallable };
