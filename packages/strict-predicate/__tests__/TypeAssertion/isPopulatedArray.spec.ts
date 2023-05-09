import { expect } from "chai";

import { describe, it } from "mocha";

import { isPopulatedArray } from "../../src/TypeAssertion/isPopulatedArray.js";

import { BaseType, getInvertedValues } from "../Utils.js";

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
				expect(
					(): void =>
					{
						isPopulatedArray([]);
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when given a populated array",
			(): void =>
			{
				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3]);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isPopulatedArray(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should return when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3], { minLength: 2 });
					}
				).to.not.throw();

				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3], { minLength: 3 });
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when given an array with a length below the minLength constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3], { minLength: 4 });
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when given an array with all the values passing the itemGuard constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3], { itemGuard: isNumberTest });
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when given an array with some values not passing the itemGuard constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest });
					}
				).to.throw(Error, /./);
			}
		);
	}
);
