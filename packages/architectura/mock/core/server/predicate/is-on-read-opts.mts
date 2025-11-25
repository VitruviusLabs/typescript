import type { OnReadOpts } from "node:net";
import { isCallable, isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate";

function isOnReadOpts(value: unknown): value is OnReadOpts
{
	return isStructuredData<OnReadOpts>(value, {
		buffer: { test: unary(isInstanceOf, Uint8Array) },
		callback: { test: isCallable },
	});
}

export { isOnReadOpts };
