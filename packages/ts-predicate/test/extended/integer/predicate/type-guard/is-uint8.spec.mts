import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type UInt8, isUInt8 } from "../../../../../src/_index.mjs";
import { IntegerBoundaryEnum } from "../../../../../src/extended/integer/definition/enum/integer-boundary.enum.mjs";

describe("isUInt8", (): void => {
	it("should return true when given an integer with the boundaries", (): void => {
		const VALUES: Array<number> = [
			0,
			1,
			IntegerBoundaryEnum.UINT8_MAX - 1,
			IntegerBoundaryEnum.UINT8_MAX,
		];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isUInt8(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given an integer outside the boundaries", (): void => {
		const VALUES: Array<number> = [-1, IntegerBoundaryEnum.UINT8_MAX + 1];

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isUInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given a non-integer number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isUInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isUInt8(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to an UInt8", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number = createValue();

			if (isUInt8(VALUE))
			{
				consumeValue<UInt8>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
