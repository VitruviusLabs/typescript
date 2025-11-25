import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertUInt8 } from "../../../../../src/_index.mjs";
import { IntegerBoundaryEnum } from "../../../../../src/extended/integer/definition/enum/integer-boundary.enum.mjs";

describe("assertUInt8", (): void => {
	it("should return when given an integer with the boundaries", (): void => {
		const VALUES: Array<number> = [
			0,
			1,
			IntegerBoundaryEnum.UINT8_MAX - 1,
			IntegerBoundaryEnum.UINT8_MAX,
		];

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUInt8(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given an integer outside the boundaries", (): void => {
		const VALUES: Array<number> = [-1, IntegerBoundaryEnum.UINT8_MAX + 1];

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUInt8(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should throw when given any other number", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUInt8(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUInt8(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a number", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertUInt8(VALUE);
			consumeValue<number>(VALUE);
		};

		throws(WRAPPER);
	});
});
