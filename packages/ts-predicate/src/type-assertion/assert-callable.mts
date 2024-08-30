import { isCallable } from "../type-guard/is-callable.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

// eslint-disable-next-line @ts/no-unsafe-function-type -- Allow proper function inference
function assertCallable(value: unknown): asserts value is Function
{
	if (!isCallable(value))
	{
		throw new ValidationError("The value must be a callable.");
	}
}

export { assertCallable };
