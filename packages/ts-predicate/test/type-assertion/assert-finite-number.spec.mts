import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertFiniteNumber } from "../../src/_index.mjs";

describe("assertFiniteNumber", (): void => {
	it("should return when given a real number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.FINITE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertFiniteNumber(ITEM);
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
				assertFiniteNumber(ITEM);
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
				assertFiniteNumber(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertFiniteNumber(VALUE);
			consumeValue<number>(VALUE);
		};

		throws(WRAPPER);
	});
});
