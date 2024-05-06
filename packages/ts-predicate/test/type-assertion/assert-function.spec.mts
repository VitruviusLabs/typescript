import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertFunction", (): void => {
	it("should return when given a function (arrow, regular, or constructor)", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertFunction(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertFunction(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
