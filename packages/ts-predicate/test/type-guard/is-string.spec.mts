import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isString } from "../../src/_index.mjs";

describe("isString", (): void => {
	it("should return true when given a string", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isString(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isString(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a string", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isString(VALUE))
			{
				consumeValue<string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
