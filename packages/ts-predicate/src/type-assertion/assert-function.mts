import { isFunction } from "../type-guard/is-function.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

// eslint-disable-next-line @ts/no-unsafe-function-type -- Allow proper function inference
function assertFunction(value: unknown): asserts value is Function
{
	if (!isFunction(value))
	{
		throw new ValidationError("The value must be a function.");
	}
}

export { assertFunction };
