import type { SinonSpy } from "sinon";
import { isObject } from "../../predicate/is-object.mjs";
import { isFunction } from "../../predicate/is-function.mjs";

function isSpy(value: unknown): value is SinonSpy
{
	if (!isObject(value) && !isFunction(value))
	{
		return false;
	}

	const SPY_KEYS: Array<string> = [
		"callCount",
		"called",
		"notCalled",
		"calledOnce",
		"calledTwice",
		"calledThrice",
		"firstCall",
		"secondCall",
		"thirdCall",
		"lastCall",
		"thisValues",
		"args",
		"exceptions",
		"returnValues",
	];

	return SPY_KEYS.every(
		(key: string): boolean =>
		{
			return key in value;
		}
	);
}

export { isSpy };
