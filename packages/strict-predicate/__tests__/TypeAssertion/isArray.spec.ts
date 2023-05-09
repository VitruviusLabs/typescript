import { expect } from "chai";

import { describe, it } from "mocha";

import { isArray } from "../../src/TypeAssertion/isArray.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

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
					expect(
						(): void =>
						{
							isArray(ITEM);
						}
					).to.not.throw();
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
					expect(
						(): void =>
						{
							isArray(ITEM);
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
						isArray([1, 2, 3], { minLength: 2 });
					}
				).to.not.throw();

				expect(
					(): void =>
					{
						isArray([1, 2, 3], { minLength: 3 });
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
						isArray([], { minLength: 1 });
					}
				).to.throw(Error, /./);

				expect(
					(): void =>
					{
						isArray([1, 2, 3], { minLength: 4 });
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
						isArray([], { itemGuard: isNumberTest });
					}
				).to.not.throw();

				expect(
					(): void =>
					{
						isArray([1, 2, 3], { itemGuard: isNumberTest });
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
						isArray([1, 2, 3, Symbol("anomaly")], { itemGuard: isNumberTest });
					}
				).to.throw(Error, /./);
			}
		);
	}
);
