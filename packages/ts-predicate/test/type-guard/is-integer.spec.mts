import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isInteger } from "../../src/_index.mjs";

describe("isInteger", (): void => {
	it("should return true when given a safe integer", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.INTEGER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInteger(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given any other number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInteger(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInteger(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isInteger(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
