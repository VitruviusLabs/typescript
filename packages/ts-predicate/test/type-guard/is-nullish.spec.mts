import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isNullish", (): void => {
	it("should return true when given undefined, null, or NaN", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isNullish(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isNullish(ITEM);

			strictEqual(RESULT, false);
		}
	});
});
