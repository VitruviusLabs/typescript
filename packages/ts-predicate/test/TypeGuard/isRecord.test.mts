import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeGuard } from "../../src/index.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeGuard.isRecord",
	(): void =>
	{
		it(
			"should return true when given a record object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isRecord(ITEM);

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
					const RESULT: unknown = TypeGuard.isRecord(ITEM);

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
					const RESULT: unknown = TypeGuard.isRecord(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given a record with all the values passing the itemTest constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isRecord({ a: 1, b: 2, c: 3 }, { itemTest: isNumberTest });

				strictEqual(RESULT, true);
			}
		);

		it(
			"should ignore empty constraints.",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isRecord({ a: 1, b: "2", c: true }, {});

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given a record with some values not passing the itemTest constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, { itemTest: isNumberTest });

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when given a record with all the values passing the test constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isRecord({ a: 1, b: 2, c: 3 }, isNumberTest);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when given a record with some values not passing the test constraint",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest);

				strictEqual(RESULT, false);
			}
		);
	}
);
