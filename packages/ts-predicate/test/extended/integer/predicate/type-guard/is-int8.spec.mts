import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type Int8, isInt8 } from "../../../../../src/_index.mjs";
import { IntegerBoundaryEnum } from "../../../../../src/extended/integer/definition/enum/integer-boundary.enum.mjs";

describe("isInt8", (): void => {
	it("should return true when given an integer with the boundaries", (): void => {
		const VALUES: Array<number> = [
			IntegerBoundaryEnum.INT8_MIN,
			IntegerBoundaryEnum.INT8_MIN + 1,
			-1,
			0,
			1,
			IntegerBoundaryEnum.INT8_MAX - 1,
			IntegerBoundaryEnum.INT8_MAX,
		];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt8(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given an integer outside the boundaries", (): void => {
		const VALUES: Array<number> = [
			IntegerBoundaryEnum.INT8_MIN - 1,
			IntegerBoundaryEnum.INT8_MAX + 1,
		];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given a non-integer number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to an Int8", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number = createValue();

			if (isInt8(VALUE))
			{
				consumeValue<Int8>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
