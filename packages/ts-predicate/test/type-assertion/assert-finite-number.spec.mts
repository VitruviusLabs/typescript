import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertFiniteNumber", (): void => {
	it("should return when given a real number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.FINITE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertFiniteNumber(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given +/-Infinity", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertFiniteNumber(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertFiniteNumber(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});
});
