import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeAssertion } from "../../src/_index.mjs";

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

	it("should narrow the type to a nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue(0);

			TypeAssertion.assertNullish(VALUE);
			consumeValue<null | undefined>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue(0);

			TypeAssertion.assertNullish(VALUE);
			consumeValue<undefined>(VALUE);
		};

		throws(WRAPPER);
	});
});
