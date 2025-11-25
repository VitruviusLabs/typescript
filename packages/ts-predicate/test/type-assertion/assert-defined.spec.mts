import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { NoValue, type NonNullish, assertDefined } from "../../src/_index.mjs";

describe("assertDefined", (): void => {
	it("should throw when given undefined, null, NaN, or NoValue", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		VALUES.push(NoValue);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertDefined(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should return when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertDefined(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should narrow the type to a non-nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertDefined(VALUE);
			consumeValue<NonNullish<unknown>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a non-nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue();

			assertDefined(VALUE);
			consumeValue<number>(VALUE);
		};

		throws(WRAPPER);
	});
});
