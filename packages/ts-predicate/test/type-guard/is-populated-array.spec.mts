import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { isInteger, isPopulatedArray } from "../../src/_index.mjs";

describe("isPopulatedArray", (): void => {
	it("should return false when given an empty array", (): void => {
		const RESULT: unknown = isPopulatedArray([]);

		strictEqual(RESULT, false);
	});

	it("should return false when given a populated array", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3]);

		strictEqual(RESULT, true);
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isPopulatedArray(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return true when given an array with a length greater or equal to the minLength constraint", (): void => {
		const RESULT_GREATER_LENGTH: unknown = isPopulatedArray([1, 2, 3], { minLength: 2 });
		const RESULT_EXACT_LENGTH: unknown = isPopulatedArray([1, 2, 3], { minLength: 3 });

		strictEqual(RESULT_GREATER_LENGTH, true);
		strictEqual(RESULT_EXACT_LENGTH, true);
	});

	it("should return false when given an array with a length below the minLength constraint", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3], { minLength: 4 });

		strictEqual(RESULT, false);
	});

	it("should return true when given an array with all the values passing the itemTest constraint", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3], { itemTest: isInteger });

		strictEqual(RESULT, true);
	});

	it("should return false when given an array with some values not passing the itemTest constraint", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemTest: isInteger });

		strictEqual(RESULT, false);
	});

	it("should return true when given an array with all the values passing the test constraint", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3], isInteger);

		strictEqual(RESULT, true);
	});

	it("should return false when given an array with some values not passing the test constraint", (): void => {
		const RESULT: unknown = isPopulatedArray([1, 2, 3, Symbol("anomaly")], isInteger);

		strictEqual(RESULT, false);
	});

	it("should narrow the type to a populated array (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isPopulatedArray(VALUE))
			{
				consumeValue<[unknown, ...Array<unknown>]>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a populated array (explicit narrowing, direct test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isPopulatedArray(VALUE, isInteger))
			{
				consumeValue<[number, ...Array<number>]>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a populated array (explicit narrowing, item test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isPopulatedArray(VALUE, { itemTest: isInteger }))
			{
				consumeValue<[number, ...Array<number>]>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a populated array (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: [number, ...Array<number>] | undefined = createValue();

			if (isPopulatedArray(VALUE))
			{
				consumeValue<[number, ...Array<number>]>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a populated array (array narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Array<number> | undefined = createValue();

			if (isPopulatedArray(VALUE))
			{
				consumeValue<[number, ...Array<number>]>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
