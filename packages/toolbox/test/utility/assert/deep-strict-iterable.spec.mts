import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { deepStrictIterable } from "../../../src/_index.mjs";

describe("deepStrictIterable", (): void => {
	it("should throw if the value is not an object", (): void => {
		throws((): void => { deepStrictIterable(null, []); });
	});

	it("should throw if the value is an object without Symbol.iterator", (): void => {
		throws((): void => { deepStrictIterable({}, []); });
	});

	it("should throw if the value is an object with a Symbol.iterator that's not a function", (): void => {
		throws((): void => { deepStrictIterable({ [Symbol.iterator]: 42 }, []); });
	});

	it("should throw if the value is an object which cannot be spread", (): void => {
		throws((): void => { deepStrictIterable({ [Symbol.iterator]: (): void => {} }, []); });
	});

	it("should throw if the values are not similar", (): void => {
		throws((): void => { deepStrictIterable([4, 5, 6].values(), [1, 2, 3]); });
	});

	it("should return if the values are similar", (): void => {
		doesNotThrow((): void => { deepStrictIterable([1, 2, 3].values(), [1, 2, 3]); });
	});
});
