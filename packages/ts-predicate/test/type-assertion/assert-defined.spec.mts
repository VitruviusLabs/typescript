import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertDefined", (): void => {
	it("should throw when given undefined, null, or NaN", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertDefined(ITEM);
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
				TypeAssertion.assertDefined(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should narrow the type to a non-nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertDefined(VALUE);
			consumeValue<NonNullable<unknown>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a non-nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue();

			TypeAssertion.assertDefined(VALUE);
			consumeValue<number>(VALUE);
		};

		throws(WRAPPER);
	});
});
