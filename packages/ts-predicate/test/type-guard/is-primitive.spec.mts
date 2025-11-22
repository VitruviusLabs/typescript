import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isPrimitive } from "../../src/_index.mjs";

describe("isPrimitive", (): void => {
	it("should return true when given a primitive value", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isPrimitive(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given a composite value", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isPrimitive(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a primitive (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue({});

			if (isPrimitive(VALUE))
			{
				consumeValue<bigint | boolean | number | string | null | undefined>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a primitive (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | number | string = createValue({});

			if (isPrimitive(VALUE))
			{
				consumeValue<number | string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
