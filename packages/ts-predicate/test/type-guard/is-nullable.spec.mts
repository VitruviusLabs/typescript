import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { NoValue, isNullable } from "../../src/_index.mjs";

describe("isNullable", (): void => {
	it("should return true when given null or undefined", (): void => {
		const VALUES: Array<unknown> = [null, undefined];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNullable(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		VALUES.push(Number.NaN);
		VALUES.push(NoValue);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isNullable(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a nullable value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue(0);

			if (isNullable(VALUE))
			{
				consumeValue<null | undefined>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a nullable value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue(0);

			if (isNullable(VALUE))
			{
				consumeValue<undefined>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
