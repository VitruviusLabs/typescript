import type { SocketConstructorOpts } from "node:net";
import { isBoolean, isInstanceOf, isNumber, isStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-guard";

function isSocketConstructorOpts(value: unknown): value is SocketConstructorOpts
{
	return isStructuredData<SocketConstructorOpts>(value, {
		// eslint-disable-next-line id-length -- Native property name
		fd: { test: isNumber, optional: true },
		allowHalfOpen: { test: isBoolean, optional: true },
		readable: { test: isBoolean, optional: true },
		writable: { test: isBoolean, optional: true },
		signal: { test: unary(isInstanceOf, AbortSignal), optional: true },
	});
}

export { isSocketConstructorOpts };
