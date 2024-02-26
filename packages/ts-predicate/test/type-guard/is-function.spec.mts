import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isFunction", (): void => {
	it("should return true when given a function (arrow, regular, or constructor)", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isFunction(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isFunction(ITEM);

			strictEqual(RESULT, false);
		}
	});
});
