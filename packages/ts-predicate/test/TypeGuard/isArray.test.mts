import { strictEqual } from "assert";

import { describe, it } from "node:test";

import { isArray } from "../../src/TypeGuard/isArray.mjs";

import { BaseType, getInvertedValues, getValues } from "../common/getValues.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeGuard / isArray",
	(): void =>
	{
		it(
			"should return true when given an array",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isArray(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isArray(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				const RESULT_GREATER_LENGTH: unknown = isArray([1, 2, 3], { minLength: 2 });
				const RESULT_EXACT_LENGTH: unknown = isArray([1, 2, 3], { minLength: 3 });

				strictEqual(RESULT_GREATER_LENGTH, true);
				strictEqual(RESULT_EXACT_LENGTH, true);
			}
		);

		it(
			"should return false when given an array with a length below the minLength constraint",
			(): void =>
			{
				const RESULT_EMPTY: unknown = isArray([], { minLength: 1 });
				const RESULT_SMALLER_LENGTH: unknown = isArray([1, 2, 3], { minLength: 4 });

				strictEqual(RESULT_EMPTY, false);
				strictEqual(RESULT_SMALLER_LENGTH, false);
			}
		);

		it(
			"should return true when given an array with all the values passing the itemTest constraint",
			(): void =>
			{
				const RESULT_EMPTY: unknown = isArray([], { itemTest: isNumberTest });
				const RESULT_VALID: unknown = isArray([1, 2, 3], { itemTest: isNumberTest });

				strictEqual(RESULT_EMPTY, true);
				strictEqual(RESULT_VALID, true);
			}
		);

		it(
			"should return false when given an array with some values not passing the itemTest constraint",
			(): void =>
			{
				const RESULT: unknown = isArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });

				strictEqual(RESULT, false);
			}
		);
	}
);
