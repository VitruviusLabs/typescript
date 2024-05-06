import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { GroupType, getInvertedValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isEnumValue", (): void => {
	it("should return true when given a valid value", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<number> = ENUM_VALUES;

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isEnumValue(ITEM, ENUM_VALUES), true);
		}
	});

	it("should return false when given anything else", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isEnumValue(ITEM, ENUM_VALUES), false);
		}
	});
});
