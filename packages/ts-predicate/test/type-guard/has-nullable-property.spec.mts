import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.hasNullableProperty", (): void => {
	it("should return false when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const RESULT_STRING: unknown = TypeGuard.hasNullableProperty({}, "answer");
		const RESULT_SYMBOL: unknown = TypeGuard.hasNullableProperty({}, SYMBOL);

		strictEqual(RESULT_STRING, false);
		strictEqual(RESULT_SYMBOL, false);
	});

	it("should return true when given an object with the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const RESULT_STRING: unknown = TypeGuard.hasNullableProperty({ answer: undefined }, "answer");
		const RESULT_SYMBOL: unknown = TypeGuard.hasNullableProperty({ [SYMBOL]: undefined }, SYMBOL);

		strictEqual(RESULT_STRING, true);
		strictEqual(RESULT_SYMBOL, true);
	});
});
