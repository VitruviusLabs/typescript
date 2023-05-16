import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isStructuredData } from "../../src/TypeAssertion/isStructuredData.js";

import { BaseType, getInvertedValues, testError } from "../utils.js";

import type { TypeAssertionStructuredDataDescriptor } from "../../src/Types/TypeAssertionStructuredDataDescriptor.js";

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

const DESCRIPTOR: TypeAssertionStructuredDataDescriptor<TestData> =
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
	"TypeGuard / isStructuredData",
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
						isStructuredData(ITEM, DESCRIPTOR);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should return when every property of the object is valid",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isStructuredData({ a: 1, b: 2 }, DESCRIPTOR);
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
					isStructuredData({ a: 1, b: "2" }, DESCRIPTOR);
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when an optional property is missing",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isStructuredData({ a: 1 }, DESCRIPTOR);
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
					isStructuredData({ b: 2 }, DESCRIPTOR);
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when a nullable property is nullish",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isStructuredData({ a: undefined, b: 2 }, DESCRIPTOR);
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
					isStructuredData({ a: 1, b: undefined }, DESCRIPTOR);
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should throw when there is an extraneous property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					isStructuredData({ a: 1, b: 2, c: 3 }, DESCRIPTOR);
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
