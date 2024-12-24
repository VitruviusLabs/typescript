import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isObject", (): void => {
	it("should return true when given an object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isObject(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isObject(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to an object (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isObject(VALUE))
			{
				consumeValue<object>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to an object (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | undefined = createValue();

			if (TypeGuard.isObject(VALUE))
			{
				consumeValue<Date>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
