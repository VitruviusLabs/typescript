import type { OnReadOpts, SocketConstructorOpts } from "node:net";
import { isBoolean, isInstanceOf, isNumber, isStructuredData, unary } from "@vitruvius-labs/ts-predicate/type-guard";

// @TODO: Review this type guard as it is too complex.

function isSocketConstructorOpts(value: unknown): value is SocketConstructorOpts
{
	return isStructuredData<SocketConstructorOpts>(value, {
		// eslint-disable-next-line id-length -- Native property name
		fd: { test: isNumber, optional: true },
		allowHalfOpen: { test: isBoolean, optional: true },
		readable: { test: isBoolean, optional: true },
		writable: { test: isBoolean, optional: true },
		signal: { test: unary(isInstanceOf, AbortSignal), optional: true },
		onread: {
			test: (scopedValue: unknown): scopedValue is OnReadOpts | undefined =>
			{
				if (scopedValue === undefined)
				{
					return true;
				}

				return isStructuredData<OnReadOpts>(scopedValue, {
					buffer: {
						test: (subScopedValue: unknown): subScopedValue is Uint8Array =>
						{
							return subScopedValue instanceof Uint8Array;
						},
					},
					callback: {
						test: (subScopedValue: unknown): subScopedValue is (bytesWritten: number, buffer: Uint8Array) => boolean =>
						{
							return typeof subScopedValue === "function";
						},
					},
				});
			},
		},
	});
}

export { isSocketConstructorOpts };
