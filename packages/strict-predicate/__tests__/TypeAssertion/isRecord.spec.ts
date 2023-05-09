import { expect } from "chai";

import { describe, it } from "mocha";

import { isRecord } from "../../src/TypeAssertion/isRecord.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeAssertion / isRecord",
	(): void =>
	{
		it(
			"should return when given a record object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isRecord(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given an instantiated class",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isRecord(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isRecord(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should return when given a record with all the values passing the guard constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isRecord({ a: 1, b: 2, c: 3 }, isNumberTest);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when given a record with some values not passing the guard constraint",
			(): void =>
			{
				expect(
					(): void =>
					{
						isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest);
					}
				).to.throw(Error, /./);
			}
		);
	}
);
