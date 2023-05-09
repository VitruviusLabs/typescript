import { expect } from "chai";

import { describe, it } from "mocha";

import { isRecord } from "../../src/TypeGuard/isRecord.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeGuard / isRecord",
	(): void =>
	{
		it(
			"should return true when given a record object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					expect(isRecord(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given an instantiated class",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.ARRAY, BaseType.INSTANTIATED);

				for (const ITEM of VALUES)
				{
					expect(isRecord(ITEM)).to.be.false;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(isRecord(ITEM)).to.be.false;
				}
			}
		);

		it(
			"should return true when given a record with all the values passing the guard constraint",
			(): void =>
			{
				expect(isRecord({ a: 1, b: 2, c: 3 }, isNumberTest)).to.be.true;
			}
		);

		it(
			"should return false when given a record with some values not passing the guard constraint",
			(): void =>
			{
				expect(isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest)).to.be.false;
			}
		);
	}
);
