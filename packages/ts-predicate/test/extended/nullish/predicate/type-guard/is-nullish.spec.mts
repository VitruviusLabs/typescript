import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type NullishValues, isNullish } from "../../../../../src/_index.mjs";

describe("isNullish", (): void => {
	it("should return true when given null, undefined, NaN, or NoValue", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNullish(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNullish(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue(0);

			if (isNullish(VALUE))
			{
				consumeValue<NullishValues>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue(0);

			if (isNullish(VALUE))
			{
				consumeValue<undefined>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
