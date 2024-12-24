import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { consumeValue, createValue } from "@vitruvius-labs/testing-ground";

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

	it("should narrow the type to an object with the corresponding property (regular)", (): void => {
		const WRAPPER = (): void => {
			const VALUE: object = createValue({});

			if (TypeGuard.hasNullableProperty(VALUE, "key"))
			{
				consumeValue<{ key: unknown }>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an object with the corresponding property (symbol)", (): void => {
		const WRAPPER = (): void => {
			const SYMBOL: unique symbol = Symbol("key");

			const VALUE: object = createValue({});

			if (TypeGuard.hasNullableProperty(VALUE, SYMBOL))
			{
				consumeValue<{ [SYMBOL]: unknown }>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
