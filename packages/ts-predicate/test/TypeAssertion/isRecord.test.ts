import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isRecord } from "../../src/TypeAssertion/isRecord.js";

import { BaseType, GroupType, getInvertedValues, getValues, testError } from "../common/utils.js";

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
					const WRAPPER = (): void =>
					{
						isRecord(ITEM);
					};

					doesNotThrow(WRAPPER);
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
					const WRAPPER = (): void =>
					{
						isRecord(ITEM);
					};

					throws(WRAPPER, testError);
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
					const WRAPPER = (): void =>
					{
						isRecord(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should return when given a record with all the values passing the guard constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isRecord({ a: 1, b: 2, c: 3 }, isNumberTest);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given a record with some values not passing the guard constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest);
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
