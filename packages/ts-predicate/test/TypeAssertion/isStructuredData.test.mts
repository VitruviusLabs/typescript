import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { BaseType, getInvertedValues } from "../common/getValues.mjs";

import { testAggregateError, testError } from "../common/testError.mjs";

import type { StructuredDataDescriptor } from "../../src/index.mjs";

interface TestData
{
	a: number | undefined;
	b?: number;
}

function isNumberTest(value: unknown): asserts value is number
{
	if (typeof value !== "number")
	{
		throw new Error("value is not a number");
	}
}

const DESCRIPTOR: StructuredDataDescriptor<TestData> =
{
	a: {
		nullable: true,
		test: isNumberTest,
	},
	b: {
		optional: true,
		test: isNumberTest,
	}
};

describe(
	"TypeAssertion.isStructuredData",
	(): void =>
	{
		it(
			"should throw when the value is not a structured data",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isStructuredData(ITEM, DESCRIPTOR);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should throw when there is an extraneous property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: 1, b: 2, c: 3 }, DESCRIPTOR);
				};

				throws(WRAPPER, testAggregateError);
			}
		);

		it(
			"should return when every property of the object is valid",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: 1, b: 2 }, DESCRIPTOR);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when a property value is invalid",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: 1, b: "2" }, DESCRIPTOR);
				};

				throws(WRAPPER, testAggregateError);
			}
		);

		it(
			"should return when an optional property is missing",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: 1 }, DESCRIPTOR);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when a required property is missing",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ b: 2 }, DESCRIPTOR);
				};

				throws(WRAPPER, testAggregateError);
			}
		);

		it(
			"should return when a nullable property is nullish",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: undefined, b: 2 }, DESCRIPTOR);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when a non-nullable property is nullish",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData({ a: 1, b: undefined }, DESCRIPTOR);
				};

				throws(WRAPPER, testAggregateError);
			}
		);
	}
);
