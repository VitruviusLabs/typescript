import type { SinonSpyCall } from "sinon";
import { isFunction } from "../../predicate/is-function.mjs";
import { isObject } from "../../predicate/is-object.mjs";

function isSpyCall(value: unknown): value is SinonSpyCall
{
	if (!isObject(value) && !isFunction(value))
	{
		return false;
	}

	const SPY_CALL_KEYS: Array<string> = [
		"args",
		"thisValue",
		"exception",
		"returnValue",
		"callback",
		"firstArg",
		"lastArg",
	];

	return SPY_CALL_KEYS.every(
		(key: string): boolean =>
		{
			return key in value;
		}
	);
}

export { isSpyCall };
