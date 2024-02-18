import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { type StructuredDataDescriptor, TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

import { BaseType, getInvertedValues } from "../common/getValues.mjs";

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

					throws(WRAPPER, createErrorTest("The value must be a record."));
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

				throws(WRAPPER, createErrorTest(new AggregateError(
					[ new Error(`The value has an extraneous property "c".`) ],
					"The value is an object, but some properties are incorrect."
				)));
			}
		);

		it(
			"should return when there is an extraneous property, but extraneous properties are allowed",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.isStructuredData(
						{ a: 1, b: 2, c: 3 },
						DESCRIPTOR,
						{ allowExtraneousProperties: true }
					);
				};

				doesNotThrow(WRAPPER);
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

				throws(WRAPPER, createErrorTest(new AggregateError(
					[
						new Error(
							`The property "b" has an incorrect value.`,
							{ cause: new Error("value is not a number") }
						)
					],
					"The value is an object, but some properties are incorrect."
				)));
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

				throws(WRAPPER, createErrorTest(new AggregateError(
					[ new Error(`The required property "a" is missing.`) ],
					"The value is an object, but some properties are incorrect."
				)));
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

				throws(WRAPPER, createErrorTest(new AggregateError(
					[ new Error(`The property "b" must not have a nullish value (undefined, null, or NaN).`) ],
					"The value is an object, but some properties are incorrect."
				)));
			}
		);
	}
);
