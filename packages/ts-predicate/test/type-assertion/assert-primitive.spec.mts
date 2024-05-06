import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertPrimitive", (): void => {
	it("should return when given a primitive value", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertPrimitive(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given a composite value", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertPrimitive(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
