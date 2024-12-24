import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.hasProperty", (): void => {
	it("should return false when given an object without the property", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const RESULT_STRING: unknown = TypeGuard.hasProperty({}, "key");
		const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({}, SYMBOL);

		strictEqual(RESULT_STRING, false);
		strictEqual(RESULT_SYMBOL, false);
	});

	it("should return false when given an object with the property, but the property is nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ key: ITEM }, "key");
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL);

			strictEqual(RESULT_STRING, false);
			strictEqual(RESULT_SYMBOL, false);
		}
	});

	it("should return true when given an object with the property and the property is not nullish", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ key: ITEM }, "key");
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL);

			strictEqual(RESULT_STRING, true);
			strictEqual(RESULT_SYMBOL, true);
		}
	});

	it("should return false when given an object with the property and the property is of the wrong type", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH, GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ key: ITEM }, "key", TypeGuard.isString);
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeGuard.isString);

			strictEqual(RESULT_STRING, false);
			strictEqual(RESULT_SYMBOL, false);
		}
	});

	it("should return true when given an object with the property and the property is of the correct type", (): void => {
		const SYMBOL: unique symbol = Symbol("key");

		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT_STRING: unknown = TypeGuard.hasProperty({ key: ITEM }, "key", TypeGuard.isString);
			const RESULT_SYMBOL: unknown = TypeGuard.hasProperty({ [SYMBOL]: ITEM }, SYMBOL, TypeGuard.isString);

			strictEqual(RESULT_STRING, true);
			strictEqual(RESULT_SYMBOL, true);
		}
	});

	it("should narrow the type to an object with the corresponding property (regular)", (): void => {
		const WRAPPER = (): void => {
			const VALUE: object = createValue({});

			if (TypeGuard.hasProperty(VALUE, "key"))
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

			if (TypeGuard.hasProperty(VALUE, SYMBOL))
			{
				consumeValue<{ [SYMBOL]: unknown }>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
