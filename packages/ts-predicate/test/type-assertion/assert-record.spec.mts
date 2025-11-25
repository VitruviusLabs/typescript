import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { ValidationError, assertRecord, isInteger } from "../../src/_index.mjs";

describe("assertRecord", (): void => {
	it("should return when given a record object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertRecord(ITEM);
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
				assertRecord(ITEM);
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
				assertRecord(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value must be a record."));
		}
	});

	it("should ignore empty constraints", (): void => {
		const WRAPPER = (): void =>
		{
			assertRecord({ alpha: 1, beta: "2", gamma: true }, {});
		};

		doesNotThrow(WRAPPER);
	});

	it("should return when given a record with all the values passing the itemTest constraint", (): void => {
		const WRAPPER = (): void =>
		{
			assertRecord({ alpha: 1, beta: 2, gamma: 3 }, { itemTest: isInteger });
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given a record with some values not passing the itemTest constraint", (): void => {
		const WRAPPER = (): void =>
		{
			assertRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, { itemTest: isInteger });
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
			assertRecord({ alpha: 1, beta: 2, gamma: 3 }, isInteger);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when given a record with some values not passing the test constraint", (): void => {
		const WRAPPER = (): void =>
		{
			assertRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, isInteger);
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

			assertRecord(VALUE);
			consumeValue<Record<string, unknown>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, direct test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertRecord(VALUE, isInteger);
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, item test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertRecord(VALUE, { itemTest: isInteger });
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a record (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Record<string, number> | undefined = createValue();

			assertRecord(VALUE);
			consumeValue<Record<string, number>>(VALUE);
		};

		throws(WRAPPER);
	});
});
