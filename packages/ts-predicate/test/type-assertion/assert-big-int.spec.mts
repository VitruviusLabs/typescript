import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertBigInt } from "../../src/_index.mjs";

describe("assertBigInt", (): void => {
	it("should return when given a big integer", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.BIG_INT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertBigInt(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.BIG_INT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertBigInt(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a bigint", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertBigInt(VALUE);
			consumeValue<bigint>(VALUE);
		};

		throws(WRAPPER);
	});
});
