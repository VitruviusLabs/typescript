import type { Callable } from "../helper/definition/type/callable.mjs";
import { isCallable } from "../type-guard/is-callable.mjs";
import { ValidationError } from "./utils/validation-error.mjs";

function assertCallable<Type extends Callable = Callable>(value: unknown): asserts value is Type
{
	if (!isCallable(value))
	{
		throw new ValidationError("The value must be a callable.");
	}
}

export { assertCallable };
