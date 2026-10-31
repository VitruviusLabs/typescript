import type { Test } from "../../definition/_index.mjs";
import { rethrowUnexpectedError } from "../../utils/rethrow-unexpected-error.mjs";

/** @internal */
function itemGuard<Type>(value: unknown, callable: Test<Type>): value is Type
{
	try
	{
		return callable(value) ?? true;
	}
	catch (error: unknown)
	{
		rethrowUnexpectedError(error);

		return false;
	}
}

export { itemGuard };
