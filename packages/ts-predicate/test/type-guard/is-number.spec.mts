import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isNumber } from "../../src/_index.mjs";

describe("isNumber", (): void => {
	it("should return true when given a number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNumber(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNumber(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isNumber(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
