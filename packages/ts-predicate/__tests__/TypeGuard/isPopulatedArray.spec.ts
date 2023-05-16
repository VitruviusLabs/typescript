import { expect } from "chai";

import { describe, it } from "mocha";

import { isPopulatedArray } from "../../src/TypeGuard/isPopulatedArray.js";

import { BaseType, getInvertedValues } from "../Utils.js";

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
				expect(isPopulatedArray([])).to.be.false;
			}
		);

		it(
			"should return false when given a populated array",
			(): void =>
			{
				expect(isPopulatedArray([1, 2, 3])).to.be.true;
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.ARRAY);

				for (const ITEM of VALUES)
				{
					expect(isPopulatedArray(ITEM)).to.be.false;
				}
			}
		);

		it(
			"should return true when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				expect(isPopulatedArray([1, 2, 3], { minLength: 2 })).to.be.true;
				expect(isPopulatedArray([1, 2, 3], { minLength: 3 })).to.be.true;
			}
		);

		it(
			"should return false when given an array with a length below the minLength constraint",
			(): void =>
			{
				expect(isPopulatedArray([1, 2, 3], { minLength: 4 })).to.be.false;
			}
		);

		it(
			"should return true when given an array with all the values passing the itemGuard constraint",
			(): void =>
			{
				expect(isPopulatedArray([1, 2, 3], { itemGuard: isNumberTest })).to.be.true;
			}
		);

		it(
			"should return false when given an array with some values not passing the itemGuard constraint",
			(): void =>
			{
				expect(isPopulatedArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest })).to.be.false;
			}
		);
	}
);
