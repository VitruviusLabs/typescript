import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { type StructuredDataDescriptor, TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues } from "@vitruvius-labs/testing-ground";

interface TestData
{
	alpha: number | undefined;
	beta?: number;
}

function isNumberTest(value: unknown): value is number
{
	return typeof value === "number";
}

const DESCRIPTOR: StructuredDataDescriptor<TestData>
= {
	alpha: {
		nullable: true,
		test: isNumberTest,
	},
	beta: {
		optional: true,
		test: isNumberTest,
	},
};

describe(
	"TypeGuard.isStructuredData",
	(): void =>
	{
		it(
			"should return false when the value is not a structured data",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.RECORD);

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
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: 1, beta: 2, gamma: 3 }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when there is an extraneous property, but extraneous properties are allowed",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData(
					{ alpha: 1, beta: 2, gamma: 3 },
					DESCRIPTOR,
					{ allowExtraneousProperties: true }
				);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return true when every property of the object is valid",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: 1, beta: 2 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return true when an optional property is missing",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: 1 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when a required property is missing",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ beta: 2 }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when a nullable property is nullish",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: undefined, beta: 2 }, DESCRIPTOR);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when a non-nullable property is nullish",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: 1, beta: undefined }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return false when a property value is invalid",
			(): void =>
			{
				const RESULT: unknown = TypeGuard.isStructuredData({ alpha: 1, beta: "2" }, DESCRIPTOR);

				strictEqual(RESULT, false);
			}
		);
	}
);
