import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeGuard } from "../../src/index.mjs";

import { BaseType, getInvertedValues } from "../common/getValues.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeGuard.isPopulatedArray",
	(): void =>
	{
		it(
			"should return false when given an empty array",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([]);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return false when given a populated array",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3]);

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
					const RESULT: unknown = TypeGuard.isPopulatedArray(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				const RESULT_GREATER_LENGTH: unknown = TypeGuard.isPopulatedArray([1, 2, 3], { minLength: 2 });
				const RESULT_EXACT_LENGTH: unknown = TypeGuard.isPopulatedArray([1, 2, 3], { minLength: 3 });

				strictEqual(RESULT_GREATER_LENGTH, true);
				strictEqual(RESULT_EXACT_LENGTH, true);
			}
		);

		it(
			"should return false when given an array with a length below the minLength constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3], { minLength: 4 });

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when given an array with all the values passing the itemTest constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3], { itemTest: isNumberTest });

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given an array with some values not passing the itemTest constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when given an array with all the values passing the test constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3], isNumberTest);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given an array with some values not passing the test constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isPopulatedArray([1, 2, 3, Symbol("anomaly")], isNumberTest);

				strictEqual(RESULT, false);
			}
		);
	}
);
