import { doesNotThrow, strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type Int8, NoValue, int8 } from "../../../../../src/_index.mjs";
import { IntegerBoundaryEnum } from "../../../../../src/extended/integer/definition/enum/integer-boundary.enum.mjs";

describe("int8", (): void => {
	it("should return the provided value when given an integer with the boundaries", (): void => {
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
			let result: unknown = NoValue;

			const WRAPPER = (): void => {
				result = int8(ITEM);
			};

			doesNotThrow(WRAPPER);

			strictEqual(result, ITEM);
		}
	});

	it("should throw when given an integer outside the boundaries", (): void => {
		const VALUES: Array<number> = [
			IntegerBoundaryEnum.INT8_MIN - 1,
			IntegerBoundaryEnum.INT8_MAX + 1,
		];

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void => {
				int8(ITEM);
			};

			throws(WRAPPER);
		}
	});

	it("should throw when given a non-integer number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void => {
				int8(ITEM);
			};

			throws(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void => {
				int8(ITEM);
			};

			throws(WRAPPER);
		}
	});

	it("should narrow the type to an Int8", (): void => {
		const WRAPPER = (): void =>
		{
			consumeValue<Int8>(int8(NoValue));
		};

		throws(WRAPPER);
	});
});
