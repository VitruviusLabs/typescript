import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeGuard } from "../../src/index.mjs";

import { BaseType, getInvertedValues } from "../common/getValues.mjs";

import type { StructuredDataDescriptor } from "../../src/index.mjs";

interface TestData
{
	a: number | undefined;
	b?: number;
}

function isNumberTest(value: unknown): value is number
{
	return typeof value === "number";
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
	"TypeGuard.isStructuredData",
	(): void =>
	{
		it(
			"should return false when the value is not a structured data",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.RECORD);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isStructuredData(ITEM, DESCRIPTOR);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return false when there is an extraneous property",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: 1, b: 2, c: 3 }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when every property of the object is valid",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: 1, b: 2 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return true when an optional property is missing",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: 1 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when a required property is missing",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ b: 2 }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when a nullable property is nullish",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: undefined, b: 2 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when a non-nullable property is nullish",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: 1, b: undefined }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return false when a property value is invalid",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ a: 1, b: "2" }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);
	}
);
