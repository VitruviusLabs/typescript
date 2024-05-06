import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertUnion", (): void => {
	it("should return when given a value matching one of the test", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertUnion(ITEM, [TypeAssertion.assertString, TypeAssertion.assertNumber]);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertUnion(ITEM, [TypeAssertion.assertString, TypeAssertion.assertNumber]);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
