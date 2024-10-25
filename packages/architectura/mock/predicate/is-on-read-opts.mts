import type { OnReadOpts } from "node:net";
import { isFunction, isInstanceOf, isStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-guard";

function isOnReadOpts(value: unknown): value is OnReadOpts
{
	return isStructuredData<OnReadOpts>(value, {
		buffer: { test: unary(isInstanceOf, Uint8Array) },
		callback: { test: isFunction },
	});
}

export { isOnReadOpts };
