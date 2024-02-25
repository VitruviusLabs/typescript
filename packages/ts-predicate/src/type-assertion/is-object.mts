import { isObject as guard } from "../type-guard/is-object.mjs";

function isObject(value: unknown): asserts value is object
{
	if (!guard(value))
	{
		throw new Error("The value must be an object.");
	}
}

export { isObject };
