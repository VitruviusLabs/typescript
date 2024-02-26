import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isNumber", (): void => {
	it("should return true when given a number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isNumber(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isNumber(ITEM);

			strictEqual(RESULT, false);
		}
	});
});
