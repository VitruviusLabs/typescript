import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { type StructuredDataDescriptor, ValidationError, assertInteger, assertStructuredData } from "../../src/_index.mjs";

interface TestData
{
	alpha: number | undefined;
	beta?: number;
}

const DESCRIPTOR: StructuredDataDescriptor<TestData> = {
	alpha: {
		nullable: true,
		test: assertInteger,
	},
	beta: {
		optional: true,
		test: assertInteger,
	},
};

describe("assertStructuredData", (): void => {
	it("should throw when the value is not a record", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertStructuredData(ITEM, DESCRIPTOR);
			};

			throws(WRAPPER, createErrorTest("The value must be a record."));
		}
	});

	it("should throw when there is an extraneous property", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ alpha: 1, beta: 2, gamma: 3 }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[new ValidationError('The value has an extraneous property "gamma".')]
		)));
	});

	it("should return when there is an extraneous property, but extraneous properties are allowed", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData(
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
			assertStructuredData({ alpha: 1, beta: 2 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should ignore properties flagged so", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData(
				{ alpha: "1" },
				{ alpha: { test: assertInteger, ignore: true } }
			);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a property value is invalid", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ alpha: 1, beta: "2" }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[
				new ValidationError(
					'The property "beta" has an incorrect value.',
					[new ValidationError("The value must be an integer.")]
				),
			]
		)));
	});

	it("should return when an optional property is missing", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ alpha: 1 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a required property is missing", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ beta: 2 }, DESCRIPTOR);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an object, but some properties are incorrect.",
			[new ValidationError('The required property "alpha" is missing.')]
		)));
	});

	it("should return when a nullable property is nullish", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ alpha: undefined, beta: 2 }, DESCRIPTOR);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when a non-nullable property is nullish", (): void => {
		const WRAPPER = (): void =>
		{
			assertStructuredData({ alpha: 1, beta: undefined }, DESCRIPTOR);
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

			assertStructuredData(VALUE, DESCRIPTOR);
			consumeValue<TestData>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a structured data (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: TestData | Date = createValue();

			assertStructuredData(VALUE, { alpha: assertInteger });
			consumeValue<TestData>(VALUE);
		};

		throws(WRAPPER);
	});
});
