import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createErrorTest, createValue } from "@vitruvius-labs/testing-ground";
import { TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertNullableProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const WRAPPER_STRING = (): void => {
			TypeAssertion.assertNullableProperty({}, "key");
		};

		const WRAPPER_SYMBOL = (): void => {
			TypeAssertion.assertNullableProperty({}, SYMBOL);
		};

		throws(WRAPPER_STRING, createErrorTest("The value must have a property \"key\"."));
		throws(WRAPPER_SYMBOL, createErrorTest("The value must have a property \"Symbol(key)\"."));
	});

	it("should return when given an object with the property", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const WRAPPER_STRING = (): void => {
			TypeAssertion.assertNullableProperty({ key: undefined }, "key");
		};

		const WRAPPER_SYMBOL = (): void => {
			TypeAssertion.assertNullableProperty({ [SYMBOL]: undefined }, SYMBOL);
		};

		doesNotThrow(WRAPPER_STRING);
		doesNotThrow(WRAPPER_SYMBOL);
	});

	it("should narrow the type to an object with the corresponding property (regular)", (): void => {
		const WRAPPER = (): void => {
			const VALUE: object = createValue({});

			TypeAssertion.assertNullableProperty(VALUE, "key");
			consumeValue<{ key: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "key".'));
	});

	it("should narrow the type to an object with the corresponding property (symbol)", (): void => {
		const WRAPPER = (): void => {
			const SYMBOL: unique symbol = Symbol("key");

			const VALUE: object = createValue({});

			TypeAssertion.assertNullableProperty(VALUE, SYMBOL);
			consumeValue<{ [SYMBOL]: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "Symbol(key)".'));
	});
});
