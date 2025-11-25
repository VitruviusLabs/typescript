import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type Int16, isInt16 } from "../../../../../src/_index.mjs";
import { IntegerBoundaryEnum } from "../../../../../src/extended/integer/definition/enum/integer-boundary.enum.mjs";

describe("isInt16", (): void => {
	it("should return true when given an integer with the boundaries", (): void => {
		const VALUES: Array<number> = [
			IntegerBoundaryEnum.INT16_MIN,
			IntegerBoundaryEnum.INT16_MIN + 1,
			-1,
			0,
			1,
			IntegerBoundaryEnum.INT16_MAX - 1,
			IntegerBoundaryEnum.INT16_MAX,
		];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt16(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given an integer outside the boundaries", (): void => {
		const VALUES: Array<number> = [
			IntegerBoundaryEnum.INT16_MIN - 1,
			IntegerBoundaryEnum.INT16_MAX + 1,
		];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt16(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given a non-integer number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt16(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt16(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to an Int16", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number = createValue();

			if (isInt16(VALUE))
			{
				consumeValue<Int16>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
