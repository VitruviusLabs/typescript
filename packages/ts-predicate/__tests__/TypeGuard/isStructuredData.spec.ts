import { expect } from "chai";

import { describe, it } from "mocha";

import { isStructuredData } from "../../src/TypeGuard/isStructuredData.js";

import { BaseType, getInvertedValues } from "../Utils.js";

import type { TypeGuardStructuredDataDescriptor } from "../../src/Types/TypeGuardStructuredDataDescriptor.js";

interface TestData
{
	a: number | undefined;
	b?: number;
}

function isNumberTest(value: unknown): value is number
{
	return typeof value === "number";
}

const DESCRIPTOR: TypeGuardStructuredDataDescriptor<TestData> =
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
			"should return false when the value is not a structured data",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					expect(isStructuredData(ITEM, DESCRIPTOR)).to.be.false;
				}
			}
		);

		it(
			"should return true when every property of the object is valid",
			(): void =>
			{
				expect(isStructuredData({ a: 1, b: 2 }, DESCRIPTOR)).to.be.true;
			}
		);

		it(
			"should return true when an optional property is missing",
			(): void =>
			{
				expect(isStructuredData({ a: 1 }, DESCRIPTOR)).to.be.true;
			}
		);

		it(
			"should return false when a required property is missing",
			(): void =>
			{
				expect(isStructuredData({ b: 2 }, DESCRIPTOR)).to.be.false;
			}
		);

		it(
			"should return true when a nullable property is nullish",
			(): void =>
			{
				expect(isStructuredData({ a: undefined, b: 2 }, DESCRIPTOR)).to.be.true;
			}
		);

		it(
			"should return false when a non-nullable property is nullish",
			(): void =>
			{
				expect(isStructuredData({ a: 1, b: undefined }, DESCRIPTOR)).to.be.false;
			}
		);

		it(
			"should return false when a property value is invalid",
			(): void =>
			{
				expect(isStructuredData({ a: 1, b: "2" }, DESCRIPTOR)).to.be.false;
			}
		);

		it(
			"should return false when there is an extraneous property",
			(): void =>
			{
				expect(isStructuredData({ a: 1, b: 2, c: 3 }, DESCRIPTOR)).to.be.false;
			}
		);
	}
);
