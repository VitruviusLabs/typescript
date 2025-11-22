import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertProperty, assertString } from "../../src/_index.mjs";

describe("assertProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const WRAPPER_STRING = (): void => {
			assertProperty({}, "answer");
		};

		const WRAPPER_SYMBOL = (): void => {
			assertProperty({}, SYMBOL);
		};

		throws(WRAPPER_STRING, createErrorTest("The value must have a property \"answer\"."));
		throws(WRAPPER_SYMBOL, createErrorTest("The value must have a property \"Symbol(answer)\"."));
	});

	it("should throw when given an object with the property, but the value is nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER_STRING = (): void => {
				assertProperty({ answer: ITEM }, "answer");
			};

			const WRAPPER_SYMBOL = (): void => {
				assertProperty({ [SYMBOL]: ITEM }, SYMBOL);
			};

			throws(WRAPPER_STRING, createErrorTest("The property \"answer\" must not have a nullish value (undefined, null, NaN, or NoValue)."));
			throws(WRAPPER_SYMBOL, createErrorTest("The property \"Symbol(answer)\" must not have a nullish value (undefined, null, NaN, or NoValue)."));
		}
	});

	it("should return when given an object with the property and the value is not nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER_STRING = (): void => {
				assertProperty({ answer: ITEM }, "answer");
			};

			const WRAPPER_SYMBOL = (): void => {
				assertProperty({ [SYMBOL]: ITEM }, SYMBOL);
			};

			doesNotThrow(WRAPPER_STRING);
			doesNotThrow(WRAPPER_SYMBOL);
		}
	});

	it("should throw when given an object with the property, but the value is of the wrong type", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH, GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER_STRING = (): void => {
				assertProperty({ answer: ITEM }, "answer", assertString);
			};

			const WRAPPER_SYMBOL = (): void => {
				assertProperty({ [SYMBOL]: ITEM }, SYMBOL, assertString);
			};

			throws(WRAPPER_STRING, createErrorTest("The value must be a string."));
			throws(WRAPPER_SYMBOL, createErrorTest("The value must be a string."));
		}
	});

	it("should return when given an object with the property and the value is of the correct type", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER_STRING = (): void => {
				assertProperty({ answer: ITEM }, "answer", assertString);
			};

			const WRAPPER_SYMBOL = (): void => {
				assertProperty({ [SYMBOL]: ITEM }, SYMBOL, assertString);
			};

			doesNotThrow(WRAPPER_STRING);
			doesNotThrow(WRAPPER_SYMBOL);
		}
	});

	it("should narrow the type to an object with the corresponding property (regular)", (): void => {
		const WRAPPER = (): void => {
			const VALUE: object = createValue({});

			assertProperty(VALUE, "key");
			consumeValue<{ key: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "key".'));
	});

	it("should narrow the type to an object with the corresponding property (symbol)", (): void => {
		const WRAPPER = (): void => {
			const SYMBOL: unique symbol = Symbol("key");

			const VALUE: object = createValue({});

			assertProperty(VALUE, SYMBOL);
			consumeValue<{ [SYMBOL]: unknown }>(VALUE);
		};

		throws(WRAPPER, createErrorTest('The value must have a property "Symbol(key)".'));
	});
});
