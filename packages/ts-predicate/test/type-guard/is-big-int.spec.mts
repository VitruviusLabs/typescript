import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isBigInt } from "../../src/_index.mjs";

describe("isBigInt", (): void => {
	it("should return true when given a big integer", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.BIG_INT);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isBigInt(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.BIG_INT);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isBigInt(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a bigint", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isBigInt(VALUE))
			{
				consumeValue<bigint>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
