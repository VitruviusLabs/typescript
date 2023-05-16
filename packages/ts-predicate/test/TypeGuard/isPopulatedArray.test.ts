import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isPopulatedArray } from "../../src/TypeGuard/isPopulatedArray.js";

import { BaseType, getInvertedValues } from "../common/utils.js";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeGuard / isPopulatedArray",
	(): void =>
	{
		it(
			"should return false when given an empty array",
			(): void =>
			{
				const RESULT: unknown = isPopulatedArray([]);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return false when given a populated array",
			(): void =>
			{
				const RESULT: unknown = isPopulatedArray([1, 2, 3]);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isPopulatedArray(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				const RESULT_GREATER_LENGTH: unknown = isPopulatedArray([1, 2, 3], { minLength: 2 });
				const RESULT_EXACT_LENGTH: unknown = isPopulatedArray([1, 2, 3], { minLength: 3 });

				strictEqual(RESULT_GREATER_LENGTH, true);
				strictEqual(RESULT_EXACT_LENGTH, true);
			}
		);

		it(
			"should return false when given an array with a length below the minLength constraint",
			(): void =>
			{
				const RESULT: unknown = isPopulatedArray([1, 2, 3], { minLength: 4 });

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when given an array with all the values passing the itemGuard constraint",
			(): void =>
			{
				const RESULT: unknown = isPopulatedArray([1, 2, 3], { itemGuard: isNumberTest });

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given an array with some values not passing the itemGuard constraint",
			(): void =>
			{
				const RESULT: unknown = isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest });

				strictEqual(RESULT, false);
			}
		);
	}
);
