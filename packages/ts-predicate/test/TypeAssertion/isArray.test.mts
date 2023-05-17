import { doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { isArray } from "../../src/TypeAssertion/isArray.mjs";

import { BaseType, getInvertedValues, getValues, testError } from "../common/utils.mjs";

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

				doesNotThrow(WRAPPER_GREATER_LENGTH);

				const WRAPPER_EXACT_LENGTH = (): void =>
				{
					isArray([1, 2, 3], { minLength: 3 });
				};

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

				throws(WRAPPER_EMPTY, testError);

				const WRAPPER_SMALL_LENGTH = (): void =>
				{
					isArray([1, 2, 3], { minLength: 4 });
				};

				throws(WRAPPER_SMALL_LENGTH, testError);
			}
		);

		it(
			"should return when given an array with all the values passing the itemGuard constraint",
			(): void =>
			{
				const WRAPPER_EMPTY = (): void =>
				{
					isArray([], { itemGuard: isNumberTest });
				};

				doesNotThrow(WRAPPER_EMPTY);

				const WRAPPER_VALID = (): void =>
				{
					isArray([1, 2, 3], { itemGuard: isNumberTest });
				};

				doesNotThrow(WRAPPER_VALID);
			}
		);

		it(
			"should throw when given an array with some values not passing the itemGuard constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest });
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
