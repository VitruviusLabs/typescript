import { doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { isArray } from "../../src/TypeAssertion/isArray.mjs";

import { BaseType, getInvertedValues, getValues } from "../common/getValues.mjs";

import { testAggregateError, testError } from "../common/testError.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeAssertion / isArray",
	(): void =>
	{
		it(
			"should return when given an array",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isArray(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
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
						isArray(ITEM);
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
					isArray([1, 2, 3], { minLength: 2 });
				};

				const WRAPPER_EXACT_LENGTH = (): void =>
				{
					isArray([1, 2, 3], { minLength: 3 });
				};

				doesNotThrow(WRAPPER_GREATER_LENGTH);
				doesNotThrow(WRAPPER_EXACT_LENGTH);
			}
		);

		it(
			"should throw when given an array with a length below the minLength constraint",
			(): void =>
			{
				const WRAPPER_EMPTY = (): void =>
				{
					isArray([], { minLength: 1 });
				};

				const WRAPPER_SMALL_LENGTH = (): void =>
				{
					isArray([1, 2, 3], { minLength: 4 });
				};

				throws(WRAPPER_EMPTY, testError);
				throws(WRAPPER_SMALL_LENGTH, testError);
			}
		);

		it(
			"should return when given an array with all the values passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER_EMPTY = (): void =>
				{
					isArray([], { itemTest: isNumberTest });
				};

				const WRAPPER_VALID = (): void =>
				{
					isArray([1, 2, 3], { itemTest: isNumberTest });
				};

				doesNotThrow(WRAPPER_EMPTY);
				doesNotThrow(WRAPPER_VALID);
			}
		);

		it(
			"should throw when given an array with some values not passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });
				};

				throws(WRAPPER, testAggregateError);
			}
		);

		it(
			"should return when given an array with all the values passing the test constraint",
			(): void =>
			{
				const WRAPPER_EMPTY = (): void =>
				{
					isArray([], isNumberTest);
				};

				const WRAPPER_VALID = (): void =>
				{
					isArray([1, 2, 3], isNumberTest);
				};

				doesNotThrow(WRAPPER_EMPTY);
				doesNotThrow(WRAPPER_VALID);
			}
		);

		it(
			"should throw when given an array with some values not passing the test constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isArray([1, 2, 3, Symbol("anomaly")], isNumberTest);
				};

				throws(WRAPPER, testAggregateError);
			}
		);
	}
);
