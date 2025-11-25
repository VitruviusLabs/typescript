import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { NoValue, type NonNullish, isDefined } from "../../src/_index.mjs";

describe("isDefined", (): void => {
	it("should return false when given undefined, null, NaN, or NoValue", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		VALUES.push(NoValue);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isDefined(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return true when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isDefined(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should narrow the type to a non-nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isDefined(VALUE))
			{
				consumeValue<NonNullish<unknown>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a non-nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue();

			if (isDefined(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
