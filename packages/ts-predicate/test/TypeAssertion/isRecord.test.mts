import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe(
	"TypeAssertion.isRecord",
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
						TypeAssertion.isRecord(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given an instantiated class",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INSTANTIATED);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isRecord(ITEM);
					};

					throws(WRAPPER, createErrorTest("The value must be a record."));
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
						TypeAssertion.isRecord(ITEM);
					};

					throws(WRAPPER, createErrorTest("The value must be a record."));
				}
			}
		);

		it(
			"should ignore empty constraints",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isRecord({ a: 1, b: "2", c: true }, {});
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should return when given a record with all the values passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isRecord({ a: 1, b: 2, c: 3 }, { itemTest: isNumberTest });
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given a record with some values not passing the itemTest constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, { itemTest: isNumberTest });
				};

				throws(WRAPPER, createErrorTest(new AggregateError(
					[
						new Error(
							`The property "c" has an incorrect value.`,
							{ cause: new Error("There is no information on why the value is incorrect.") }
						)
					],
					"The value is a record, but some properties are incorrect."
				)));
			}
		);

		it(
			"should return when given a record with all the values passing the test constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isRecord({ a: 1, b: 2, c: 3 }, isNumberTest);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when given a record with some values not passing the test constraint",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isRecord({ a: 1, b: 2, c: Symbol("anomaly") }, isNumberTest);
				};

				throws(WRAPPER, createErrorTest(new AggregateError(
					[
						new Error(
							`The property "c" has an incorrect value.`,
							{ cause: new Error("There is no information on why the value is incorrect.") }
						)
					],
					"The value is a record, but some properties are incorrect.",
				)));
			}
		);
	}
);
