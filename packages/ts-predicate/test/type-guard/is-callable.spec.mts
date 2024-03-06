import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isCallable", (): void => {
	it("should return true when given an arrow function", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.CALLABLE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isCallable(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.CALLABLE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isCallable(ITEM);

			strictEqual(RESULT, false);
		}
	});
});
