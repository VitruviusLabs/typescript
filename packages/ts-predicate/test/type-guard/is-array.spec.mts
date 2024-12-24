import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe("TypeGuard.isArray", (): void => {
	it("should return true when given an array", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isArray(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isArray(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should ignore empty constraint", (): void => {
		const RESULT: unknown = TypeGuard.isArray([1, "2", true], {});

		strictEqual(RESULT, true);
	});

	it("should return true when given an array with a length greater or equal to the minLength constraint", (): void => {
		const RESULT_GREATER_LENGTH: unknown = TypeGuard.isArray([1, 2, 3], { minLength: 2 });
		const RESULT_EXACT_LENGTH: unknown = TypeGuard.isArray([1, 2, 3], { minLength: 3 });

		strictEqual(RESULT_GREATER_LENGTH, true);
		strictEqual(RESULT_EXACT_LENGTH, true);
	});

	it("should return false when given an array with a length below the minLength constraint", (): void => {
		const RESULT_EMPTY: unknown = TypeGuard.isArray([], { minLength: 1 });
		const RESULT_SMALLER_LENGTH: unknown = TypeGuard.isArray([1, 2, 3], { minLength: 4 });

		strictEqual(RESULT_EMPTY, false);
		strictEqual(RESULT_SMALLER_LENGTH, false);
	});

	it("should return true when given an array with all the values passing the itemTest constraint", (): void => {
		const RESULT_EMPTY: unknown = TypeGuard.isArray([], { itemTest: isNumberTest });
		const RESULT_VALID: unknown = TypeGuard.isArray([1, 2, 3], { itemTest: isNumberTest });

		strictEqual(RESULT_EMPTY, true);
		strictEqual(RESULT_VALID, true);
	});

	it("should return false when given an array with some values not passing the itemTest constraint", (): void => {
		const RESULT: unknown = TypeGuard.isArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });

		strictEqual(RESULT, false);
	});

	it("should return true when given an array with all the values passing the test constraint", (): void => {
		const RESULT_EMPTY: unknown = TypeGuard.isArray([], isNumberTest);
		const RESULT_VALID: unknown = TypeGuard.isArray([1, 2, 3], isNumberTest);

		strictEqual(RESULT_EMPTY, true);
		strictEqual(RESULT_VALID, true);
	});

	it("should return false when given an array with some values not passing the test constraint", (): void => {
		const RESULT: unknown = TypeGuard.isArray([1, 2, 3, Symbol("anomaly")], isNumberTest);

		strictEqual(RESULT, false);
	});

	it("should narrow the type to an array (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isArray(VALUE))
			{
				consumeValue<Array<unknown>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an array (explicit narrowing, direct test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isArray(VALUE, isNumberTest))
			{
				consumeValue<Array<number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an array (explicit narrowing, item test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isArray(VALUE, { itemTest: isNumberTest }))
			{
				consumeValue<Array<number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an array (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Array<number> | undefined = createValue();

			if (TypeGuard.isArray(VALUE))
			{
				consumeValue<Array<number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
