import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const WRAPPER_STRING = (): void => {
			TypeAssertion.assertProperty({}, "answer");
		};

		const WRAPPER_SYMBOL = (): void => {
			TypeAssertion.assertProperty({}, SYMBOL);
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
				TypeAssertion.assertProperty({ answer: ITEM }, "answer");
			};

			const WRAPPER_SYMBOL = (): void => {
				TypeAssertion.assertProperty({ [SYMBOL]: ITEM }, SYMBOL);
			};

			throws(WRAPPER_STRING, createErrorTest("The property \"answer\" must not have a nullish value (undefined, null, or NaN)."));
			throws(WRAPPER_SYMBOL, createErrorTest("The property \"Symbol(answer)\" must not have a nullish value (undefined, null, or NaN)."));
		}
	});

	it("should return when given an object with the property and the value is not nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER_STRING = (): void => {
				TypeAssertion.assertProperty({ answer: ITEM }, "answer");
			};

			const WRAPPER_SYMBOL = (): void => {
				TypeAssertion.assertProperty({ [SYMBOL]: ITEM }, SYMBOL);
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
				TypeAssertion.assertProperty({ answer: ITEM }, "answer", TypeAssertion.assertString);
			};

			const WRAPPER_SYMBOL = (): void => {
				TypeAssertion.assertProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeAssertion.assertString);
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
				TypeAssertion.assertProperty({ answer: ITEM }, "answer", TypeAssertion.assertString);
			};

			const WRAPPER_SYMBOL = (): void => {
				TypeAssertion.assertProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeAssertion.assertString);
			};

			doesNotThrow(WRAPPER_STRING);
			doesNotThrow(WRAPPER_SYMBOL);
		}
	});
});
