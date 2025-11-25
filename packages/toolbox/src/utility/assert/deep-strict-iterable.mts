import { deepStrictEqual, doesNotThrow, ok } from "node:assert";
import { getDetailedType, hasProperty, isCallable, isObject } from "@vitruvius-labs/ts-predicate";

/**
 * Asserts that a value is an iterable and that it contains the expected values.
 */
function deepStrictIterable<T>(value: unknown, expected_values: Array<T>): asserts value is Iterable<T>
{
	const MESSAGE: string = `Expected an iterable, but got ${getDetailedType(value)}.`;

	ok(isObject(value), MESSAGE);
	ok(hasProperty(value, Symbol.iterator, isCallable), MESSAGE);

	let items: Array<unknown> | undefined = undefined;

	doesNotThrow(
		(): void =>
		{
			items = [...value];
		},
		MESSAGE
	);

	deepStrictEqual(items, expected_values);
}

export { deepStrictIterable };
