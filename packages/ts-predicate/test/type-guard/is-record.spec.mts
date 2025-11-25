import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isInteger, isRecord } from "../../src/_index.mjs";

describe("isRecord", (): void => {
	it("should return true when given a record object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.RECORD);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isRecord(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given an instantiated class", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY, GroupType.INSTANTIATED);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isRecord(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isRecord(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return true when given a record with all the values passing the itemTest constraint", (): void => {
		const RESULT: unknown = isRecord({ alpha: 1, beta: 2, gamma: 3 }, { itemTest: isInteger });

		strictEqual(RESULT, true);
	});

	it("should ignore empty constraints", (): void => {
		const RESULT: unknown = isRecord({ alpha: 1, beta: "2", gamma: true }, {});

		strictEqual(RESULT, true);
	});

	it("should return false when given a record with some values not passing the itemTest constraint", (): void => {
		const RESULT: unknown = isRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, { itemTest: isInteger });

		strictEqual(RESULT, false);
	});

	it("should return true when given a record with all the values passing the test constraint", (): void => {
		const RESULT: unknown = isRecord({ alpha: 1, beta: 2, gamma: 3 }, isInteger);

		strictEqual(RESULT, true);
	});

	it("should return false when given a record with some values not passing the test constraint", (): void => {
		const RESULT: unknown = isRecord({ alpha: 1, beta: 2, gamma: Symbol("anomaly") }, isInteger);

		strictEqual(RESULT, false);
	});

	it("should narrow the type to a record (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isRecord(VALUE))
			{
				consumeValue<Record<string, unknown>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, direct test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isRecord(VALUE, isInteger))
			{
				consumeValue<Record<string, number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a record (explicit narrowing, item test)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isRecord(VALUE, { itemTest: isInteger }))
			{
				consumeValue<Record<string, number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a record (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Record<string, number> | undefined = createValue();

			if (isRecord(VALUE))
			{
				consumeValue<Record<string, number>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
