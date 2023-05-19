import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isPopulatedArray } from "../../src/TypeAssertion/isPopulatedArray.mjs";

import { BaseType, getInvertedValues } from "../common/getValues.mjs";

import { testError } from "../common/testError.mjs";


function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeAssertion / isPopulatedArray",
	(): void =>
	{
		it(
			"should throw when given an empty array",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isPopulatedArray([]);
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when given a populated array",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isPopulatedArray([1, 2, 3]);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isPopulatedArray(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should return when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				const WRAPPER_GREATER_LENGTH = (): void =>
				{
					isPopulatedArray([1, 2, 3], { minLength: 2 });
				};

				doesNotThrow(WRAPPER_GREATER_LENGTH);

				const WRAPPER_EXACT_LENGTH = (): void =>
				{
					isPopulatedArray([1, 2, 3], { minLength: 3 });
				};

				doesNotThrow(WRAPPER_EXACT_LENGTH);
			}
		);

		it(
			"should throw when given an array with a length below the minLength constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isPopulatedArray([1, 2, 3], { minLength: 4 });
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when given an array with all the values passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isPopulatedArray([1, 2, 3], { itemTest: isNumberTest });
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given an array with some values not passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
