import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertObject", (): void => {
	it("should return when given an object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertObject(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertObject(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
