import { expect } from "chai";

import { describe, it } from "mocha";

import { isArray } from "../../src/TypeGuard/isArray.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

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
					expect(isArray(ITEM)).to.be.true;
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
					expect(isArray(ITEM)).to.be.false;
				}
			}
		);

		it(
			"should return true when given an array with a length greater or equal to the minLength constraint",
			(): void =>
			{
				expect(isArray([1, 2, 3], { minLength: 2 })).to.be.true;
				expect(isArray([1, 2, 3], { minLength: 3 })).to.be.true;
			}
		);

		it(
			"should return false when given an array with a length below the minLength constraint",
			(): void =>
			{
				expect(isArray([], { minLength: 1 })).to.be.false;
				expect(isArray([1, 2, 3], { minLength: 4 })).to.be.false;
			}
		);

		it(
			"should return true when given an array with all the values passing the itemGuard constraint",
			(): void =>
			{
				expect(isArray([], { itemGuard: isNumberTest })).to.be.true;
				expect(isArray([1, 2, 3], { itemGuard: isNumberTest })).to.be.true;
			}
		);

		it(
			"should return false when given an array with some values not passing the itemGuard constraint",
			(): void =>
			{
				expect(isArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest })).to.be.false;
			}
		);
	}
);
