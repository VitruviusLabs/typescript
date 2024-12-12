import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertNullish", (): void => {
	it("should return when given undefined, null, or NaN", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertNullish(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertNullish(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
