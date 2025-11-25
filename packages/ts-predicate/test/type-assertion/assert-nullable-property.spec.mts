import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createErrorTest, createValue } from "@vitruvius-labs/testing-ground";
import { type Nullable, assertNullableProperty, assertString } from "../../src/_index.mjs";

describe("assertNullableProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const WRAPPER_STRING = (): void => {
			assertNullableProperty({}, "key");
		};

		const WRAPPER_SYMBOL = (): void => {
			assertNullableProperty({}, SYMBOL);
		};

		throws(WRAPPER_STRING, createErrorTest("The value must have a property \"key\"."));
		throws(WRAPPER_SYMBOL, createErrorTest("The value must have a property \"Symbol(key)\"."));
	});

	it("should return when given an object with the property", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const WRAPPER_STRING = (): void => {
			assertNullableProperty({ key: undefined }, "key");
		};

		const WRAPPER_SYMBOL = (): void => {
			assertNullableProperty({ [SYMBOL]: undefined }, SYMBOL);
		};

		doesNotThrow(WRAPPER_STRING);
		doesNotThrow(WRAPPER_SYMBOL);
	});

	it("should narrow the type to an object with the corresponding property (regular)", (): void => {
		const WRAPPER = (): void => {
			const VALUE: object = createValue({});

			assertNullableProperty(VALUE, "key");
			consumeValue<{ key: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "key".'));
	});

	it("should narrow the type to an object with the corresponding property (symbol)", (): void => {
		const WRAPPER = (): void => {
			const SYMBOL: unique symbol = Symbol("key");

			const VALUE: object = createValue({});

			assertNullableProperty(VALUE, SYMBOL);
			consumeValue<{ [SYMBOL]: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "Symbol(key)".'));
	});

	it("should narrow the type to an object with the corresponding property (type)", (): void => {
		const WRAPPER = (): void => {
			const SYMBOL: unique symbol = Symbol("key");

			const VALUE: Date = createValue({});

			assertNullableProperty(VALUE, SYMBOL, assertString);
			consumeValue<Date & { [SYMBOL]: Nullable<string> }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "Symbol(key)".'));
	});
});
