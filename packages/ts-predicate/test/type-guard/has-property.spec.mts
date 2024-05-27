import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.hasProperty", (): void => {
	it("should return false when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const RESULT_STRING: unknown = TypeGuard.hasProperty({}, "answer");
		const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({}, SYMBOL);

		strictEqual(RESULT_STRING, false);
		strictEqual(RESULT_SYMBOL, false);
	});

	it("should return false when given an object with the property, but the property is nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ answer: ITEM }, "answer");
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL);

			strictEqual(RESULT_STRING, false);
			strictEqual(RESULT_SYMBOL, false);
		}
	});

	it("should return true when given an object with the property and the property is not nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ answer: ITEM }, "answer");
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL);

			strictEqual(RESULT_STRING, true);
			strictEqual(RESULT_SYMBOL, true);
		}
	});

	it("should return false when given an object with the property and the property is of the wrong type", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH, GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ answer: ITEM }, "answer", TypeGuard.isString);
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeGuard.isString);

			strictEqual(RESULT_STRING, false);
			strictEqual(RESULT_SYMBOL, false);
		}
	});

	it("should return true when given an object with the property and the property is of the correct type", (): void => {
		const SYMBOL: unique symbol = Symbol("answer");

		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ answer: ITEM }, "answer", TypeGuard.isString);
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeGuard.isString);

			strictEqual(RESULT_STRING, true);
			strictEqual(RESULT_SYMBOL, true);
		}
	});
});
