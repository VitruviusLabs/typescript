import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/_index.mjs";
import { GroupType, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeGuard.isUnion", (): void => {
	it("should return true when given a value matching one of the test", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isUnion(ITEM, [TypeGuard.isString, TypeGuard.isNumber]), true);
		}
	});

	it("should return false  when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isUnion(ITEM, [TypeGuard.isString, TypeGuard.isNumber]), false);
		}
	});
});
