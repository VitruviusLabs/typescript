import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isRecord } from "../../src/TypeGuard/isRecord.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/utils.mjs";

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
					const RESULT: unknown = isRecord(ITEM);

					strictEqual(RESULT, true);
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
					const RESULT: unknown = isRecord(ITEM);

					strictEqual(RESULT, false);
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
					const RESULT: unknown = isRecord(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given a record with all the values passing the guard constraint",
			(): void =>
			{
				const RESULT: unknown = isRecord({ a: 1, b: 2, c: 3 }, isNumberTest);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given a record with some values not passing the guard constraint",
			(): void =>
			{
				const RESULT: unknown = isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest);

				strictEqual(RESULT, false);
			}
		);
	}
);
