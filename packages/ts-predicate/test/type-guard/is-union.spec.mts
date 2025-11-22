import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isNumber, isString, isUnion } from "../../src/_index.mjs";

describe("isUnion", (): void => {
	it("should return true when given a value matching one of the test", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(isUnion(ITEM, [isString, isNumber]), true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING, GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(isUnion(ITEM, [isString, isNumber]), false);
		}
	});

	it("should narrow the type to the union of types (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isUnion(VALUE, [isNumber, isString]))
			{
				consumeValue<number | string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to the union of types (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: string | undefined = createValue();

			if (isUnion(VALUE, [isNumber, isString]))
			{
				consumeValue<string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
