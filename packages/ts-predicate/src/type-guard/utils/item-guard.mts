import type { Test } from "../../definition/_index.mjs";

function itemGuard<Type>(value: unknown, callable: Test<Type>): value is Type
{
	try
	{
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- assertion return undefined
		return callable(value) ?? true;
	}
	catch
	{
		return false;
	}
}

export { itemGuard };
