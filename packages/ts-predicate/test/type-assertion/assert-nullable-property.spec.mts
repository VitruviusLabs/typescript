import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertNullableProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const WRAPPER_STRING = (): void => {
			TypeAssertion.assertNullableProperty({}, "answer");
		};

		const WRAPPER_SYMBOL = (): void => {
			TypeAssertion.assertNullableProperty({}, SYMBOL);
		};

		throws(WRAPPER_STRING, createErrorTest("The value must have a property \"answer\"."));
		throws(WRAPPER_SYMBOL, createErrorTest("The value must have a property \"Symbol(answer)\"."));
	});

	it("should return when given an object with the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const WRAPPER_STRING = (): void => {
			TypeAssertion.assertNullableProperty({ answer: undefined }, "answer");
		};

		const WRAPPER_SYMBOL = (): void => {
			TypeAssertion.assertNullableProperty({ [SYMBOL]: undefined }, SYMBOL);
		};

		doesNotThrow(WRAPPER_STRING);
		doesNotThrow(WRAPPER_SYMBOL);
	});
});
