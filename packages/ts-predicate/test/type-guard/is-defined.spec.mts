import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isDefined", (): void => {
	it("should return false when given undefined, null, or NaN", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isDefined(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return true when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isDefined(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should narrow the type to a non-nullish value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isDefined(VALUE))
			{
				consumeValue<NonNullable<unknown>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a non-nullish value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue();

			if (TypeGuard.isDefined(VALUE))
			{
				consumeValue<number>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
