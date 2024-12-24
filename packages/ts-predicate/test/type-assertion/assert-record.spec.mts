import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeAssertion, ValidationError } from "../../src/_index.mjs";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe("TypeAssertion.assertRecord", (): void => {
	it("should return when given a record object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertRecord(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given an instantiated class", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.INSTANTIATED);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertRecord(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value must be a record."));
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertRecord(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value must be a record."));
		}
	});

	it("should ignore empty constraints", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertRecord({ alpha: 1, beta: "2", gamma: true }, {});
		};

		doesNotThrow(WRAPPER);
	});

	it("should return when given a record with all the values passing the itemTest constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertRecord({ alpha: 1, beta: 2, gamma: 3 }, { itemTest: isNumberTest });
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given a record with some values not passing the itemTest constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, { itemTest: isNumberTest });
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is a record, but some properties are incorrect.",
			[
				new ValidationError(
					'The property "gamma" has an incorrect value.',
					[new ValidationError("There is no information on why the value is incorrect.")]
				),
			]
		)));
	});

	it("should return when given a record with all the values passing the test constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertRecord({ alpha: 1, beta: 2, gamma: 3 }, isNumberTest);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given a record with some values not passing the test constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, isNumberTest);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is a record, but some properties are incorrect.",
			[
				new ValidationError(
					'The property "gamma" has an incorrect value.',
					[new ValidationError("There is no information on why the value is incorrect.")]
				),
			]
		)));
	});

	it("should narrow the type to a record (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertRecord(VALUE);
			consumeValue<Record<string, unknown>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, direct test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertRecord(VALUE, isNumberTest);
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, item test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertRecord(VALUE, { itemTest: isNumberTest });
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Record<string, number> | undefined = createValue();

			TypeAssertion.assertRecord(VALUE);
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});
});
