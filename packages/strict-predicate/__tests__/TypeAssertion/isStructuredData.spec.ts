import { expect } from "chai";

import { describe, it } from "mocha";

import { isStructuredData } from "../../src/TypeAssertion/isStructuredData.js";

import { BaseType, getInvertedValues } from "../Utils.js";

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
					expect(
						(): void =>
						{
							isStructuredData(ITEM, DESCRIPTOR);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should return when every property of the object is valid",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: 1, b: 2 }, DESCRIPTOR);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when a property value is invalid",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: 1, b: "2" }, DESCRIPTOR);
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when an optional property is missing",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: 1 }, DESCRIPTOR);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when a required property is missing",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ b: 2 }, DESCRIPTOR);
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when a nullable property is nullish",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: undefined, b: 2 }, DESCRIPTOR);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when a non-nullable property is nullish",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: 1, b: undefined }, DESCRIPTOR);
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should throw when there is an extraneous property",
			(): void =>
			{
				expect(
					(): void =>
					{
						isStructuredData({ a: 1, b: 2, c: 3 }, DESCRIPTOR);
					}
				).to.throw(Error, /./);
			}
		);
	}
);
