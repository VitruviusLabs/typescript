import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { parseQualityValues } from "../../src/_index.mjs";

describe("parseQualityValues", (): void => {
	it("should return an empty array if there are no values", (): void => {
		deepStrictEqual(parseQualityValues(""), []);
	});

	it("should split the serialized values into different values", (): void => {
		deepStrictEqual(parseQualityValues("a"), ["a"]);
		deepStrictEqual(parseQualityValues("a,b,c"), ["a", "b", "c"]);
		deepStrictEqual(parseQualityValues("a, b, c"), ["a", "b", "c"]);
	});

	it("should remove the weight from the values", (): void => {
		deepStrictEqual(parseQualityValues("a,b;q=0.8,c;q=0.5"), ["a", "b", "c"]);
		deepStrictEqual(parseQualityValues("a, b;q=0.8, c;q=0.5"), ["a", "b", "c"]);
	});

	it("should order values by weight", (): void => {
		deepStrictEqual(parseQualityValues("a;q=0.5,b;q=1,c;q=0.8"), ["b", "c", "a"]);
	});

	it("should consider a weight of 1 unless specified", (): void => {
		deepStrictEqual(parseQualityValues("a;q=0.5,b,c;q=0.8"), ["b", "c", "a"]);
	});

	it("should preserve the order of values with the same weight", (): void => {
		deepStrictEqual(parseQualityValues("a;q=0.8,b,c;q=0.8"), ["b", "a", "c"]);
	});
});
