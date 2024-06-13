import { describe, it } from "node:test";
import { AssertionError, strictEqual, throws } from "node:assert";
import { createErrorPredicate } from "../../src/error-predicate/create-error-predicate.mjs";
import { getType } from "../../src/utility/get-type.mjs";

describe("createErrorPredicate", (): void => {
	const BASE_MESSAGE: string = "Expected the tested value to throw";

	describe("No argument", (): void => {
		it("should return a predicate function that throws if the value is not an instance of Error", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE);

			strictEqual(typeof PREDICATE, "function");

			const VALUES: Array<unknown> = [
				undefined,
				null,
				false,
				true,
				NaN,
				1,
				1n,
				"Test",
				Symbol.iterator,
				[],
				Object.create(null),
				{},
				new Date(),
				{ message: "Test" },
			];

			for (const VALUE of VALUES)
			{
				throws(
					(): void => { PREDICATE(VALUE); },
					new Error(`Expected the tested value to throw with an instance of Error, but got ${getType(VALUE)}.`)
				);
			}
		});

		it("should return a predicate function that throws if the error's message is empty", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(new Error("")); },
				new Error("Expected the tested value to throw with a message.")
			);
		});

		it("should return a predicate function that return true if the value is an error with a proper message", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE);

			strictEqual(typeof PREDICATE, "function");
			strictEqual(PREDICATE(new Error("Test")), true);
		});
	});

	describe("String argument", (): void => {
		it("should return a predicate function that throws if the message doesn't match the expected message", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, "Test");

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(new Error("Lorem ipsum")); },
				new Error('Expected the tested value to throw with the message "Test", but got "Lorem ipsum".')
			);
		});

		it("should return a predicate function that returns true if the message matches the expected message", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, "Test");

			strictEqual(typeof PREDICATE, "function");

			strictEqual(PREDICATE(new Error("Test")), true);
		});
	});

	describe("RegExp argument", (): void => {
		it("should return a predicate function that throws if the message doesn't match the expected pattern", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, /Test/);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(new Error("Lorem ipsum")); },
				new Error('Expected the tested value to throw with a message that match /Test/, but got "Lorem ipsum"')
			);
		});

		it("should return a predicate function that throws if the message is empty even if it match the expected pattern", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, /.*/);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(new Error("")); },
				new Error("Expected the tested value to throw with a message.")
			);
		});

		it("should return a predicate function that returns true if message matches the expected pattern", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, /Test/);

			strictEqual(typeof PREDICATE, "function");
			strictEqual(PREDICATE(new Error("Test")), true);
		});
	});

	describe("Class argument", (): void => {
		it("should return a predicate function that throws if the value is not an instance of the expected class", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, TypeError);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(new Error("Test")); },
				new Error("Expected the tested value to throw with an instance of TypeError, but got an instance of Error.")
			);
		});

		it("should return a predicate function that return if the value is an instance of the expected class", (): void => {
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, TypeError);

			strictEqual(typeof PREDICATE, "function");
			strictEqual(PREDICATE(new TypeError("Test")), true);
		});
	});

	describe("Instance argument", (): void => {
		it("should return a predicate function that throws if the value is an instance of a different class than the expected error", (): void => {
			const ACTUAL: Error = new Error("Test");
			const EXPECTED: Error = new TypeError("Test");
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, EXPECTED);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(ACTUAL); },
				new AssertionError({
					message: "Expected the tested value to throw with an error that resemble the expected error",
					actual: ACTUAL,
					expected: EXPECTED,
					operator: "deepStrictEqual",
				})
			);
		});

		it("should return a predicate function that throws if the value has a different message than the expected error", (): void => {
			const ACTUAL: Error = new TypeError("Lorem ipsum");
			const EXPECTED: Error = new TypeError("Test");
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, EXPECTED);

			strictEqual(typeof PREDICATE, "function");

			throws(
				(): void => { PREDICATE(ACTUAL); },
				new AssertionError({
					message: "Expected the tested value to throw with an error that resemble the expected error",
					actual: ACTUAL,
					expected: EXPECTED,
					operator: "deepStrictEqual",
				})
			);
		});

		it("should return a predicate function that returns true if the value is recursively similar", (): void => {
			const ACTUAL: Error = new TypeError("Test");
			const EXPECTED: Error = new TypeError("Test");
			const PREDICATE: (value: unknown) => true = createErrorPredicate(BASE_MESSAGE, EXPECTED);

			strictEqual(typeof PREDICATE, "function");
			strictEqual(PREDICATE(ACTUAL), true);
		});
	});
});
