import { deepStrictEqual, doesNotThrow, ok } from "node:assert";
import { isFunction, isObject } from "@vitruvius-labs/ts-predicate/type-guard";
import { getDetailedType } from "@vitruvius-labs/ts-predicate/type-hint";

/**
 * Asserts that a value is an iterable and that it contains the expected values.
 */
function deepStrictIterable<T>(value: unknown, expected_values: Array<T>): asserts value is Iterable<T>
{
	const MESSAGE: string = `Expected an iterable, but got ${getDetailedType(value)}.`;

	ok(isObject(value), MESSAGE);
	ok(Symbol.iterator in value, MESSAGE);
	ok(isFunction(value[Symbol.iterator]), MESSAGE);

	let items: Array<unknown> | undefined = undefined;

	doesNotThrow(
		(): void =>
		{
			// @ts-expect-error: Thrown errors are handled
			items = [...value];
		},
		MESSAGE
	);

	deepStrictEqual(items, expected_values);
}

export { deepStrictIterable };
