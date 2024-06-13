import type { Test } from "../../definition/_index.mjs";
import { rethrowUnexpectedError } from "../../utils/rethrow-unexpected-error.mjs";

/** @internal */
function itemGuard<Type>(value: unknown, callable: Test<Type>): value is Type
{
	try
	{
		// eslint-disable-next-line @typescript/no-unnecessary-condition -- assertion return undefined
		return callable(value) ?? true;
	}
	catch (error: unknown)
	{
		rethrowUnexpectedError(error);

		return false;
	}
}

export { itemGuard };
