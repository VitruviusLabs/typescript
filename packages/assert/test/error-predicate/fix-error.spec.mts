import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { fixError } from "../../src/error-predicate/fix-error.mjs";

describe("fixError", (): void => {
	it('should make the error properties enumerable, except "stack", when present', (): void => {
		const ERROR: Error = new Error("Test", { cause: new Error("Cause") });
		const AGGREGATE_ERROR: Error = new AggregateError([new Error("Cause")], "Test");

		const FIXED: Error = fixError(ERROR);
		const AGGREGATE_FIXED: Error = fixError(AGGREGATE_ERROR);

		deepStrictEqual(Object.keys(FIXED), ["message", "cause"]);
		deepStrictEqual(Object.keys(AGGREGATE_FIXED), ["message", "errors"]);
	});
});
