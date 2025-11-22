import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertInteger } from "../../src/_index.mjs";

describe("assertInteger", (): void => {
	it("should return when given a safe integer", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.INTEGER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertInteger(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given any other number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertInteger(ITEM);
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
				assertInteger(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertInteger(VALUE);
			consumeValue<number>(VALUE);
		};

		throws(WRAPPER);
	});
});
