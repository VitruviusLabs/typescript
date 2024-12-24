import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isFiniteNumber", (): void => {
	it("should return true when given a real number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.FINITE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isFiniteNumber(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given +/-Infinity", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isFiniteNumber(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isFiniteNumber(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isFiniteNumber(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
