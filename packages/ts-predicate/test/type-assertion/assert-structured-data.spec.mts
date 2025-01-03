import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { type StructuredDataDescriptor, TypeAssertion, ValidationError } from "../../src/_index.mjs";

interface TestData
{
	alpha: number | undefined;
	beta?: number;
}

function isNumberTest(value: unknown): asserts value is number
{
	if (typeof value !== "number")
	{
		throw new ValidationError("Value is not a number.");
	}
}

const DESCRIPTOR: StructuredDataDescriptor<TestData> = {
	alpha: {
		nullable: true,
		test: isNumberTest,
	},
	beta: {
		optional: true,
		test: isNumberTest,
	},
};

describe("TypeAssertion.assertStructuredData", (): void => {
	it("should throw when the value is not a record", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertStructuredData(ITEM, DESCRIPTOR);
			};

			throws(WRAPPER, createErrorTest("The value must be a record."));
		}
	});

	it("should throw when there is an extraneous property", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: 1, beta: 2, gamma: 3 }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[new ValidationError('The value has an extraneous property "gamma".')]
		)));
	});

	it("should return when there is an extraneous property, but extraneous properties are allowed", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData(
				{ alpha: 1, beta: 2, gamma: 3 },
				DESCRIPTOR,
				{ allowExtraneousProperties: true }
			);
		};

		doesNotThrow(WRAPPER);
	});

	it("should return when every property of the object is valid", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: 1, beta: 2 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should ignore properties flagged so", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData(
				{ alpha: "1" },
				{ alpha: { test: isNumberTest, ignore: true } }
			);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a property value is invalid", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: 1, beta: "2" }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[
				new ValidationError(
					'The property "beta" has an incorrect value.',
					[new ValidationError("Value is not a number.")]
				),
			]
		)));
	});

	it("should return when an optional property is missing", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: 1 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a required property is missing", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ beta: 2 }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[new ValidationError('The required property "alpha" is missing.')]
		)));
	});

	it("should return when a nullable property is nullish", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: undefined, beta: 2 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a non-nullable property is nullish", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertStructuredData({ alpha: 1, beta: undefined }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[new ValidationError('The property "beta" must not have a nullish value (undefined, null, or NaN).')]
		)));
	});

	it("should narrow the type to a structured data (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertStructuredData(VALUE, DESCRIPTOR);
			consumeValue<TestData>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a structured data (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: TestData | Date = createValue();

			TypeAssertion.assertStructuredData(VALUE, { alpha: isNumberTest });
			consumeValue<TestData>(VALUE);
		};

		throws(WRAPPER);
	});
});
