import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { isBoolean } from "../../src/_index.mjs";

describe("isBoolean", (): void => {
	it("should return true when given a boolean", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.BOOLEAN);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isBoolean(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.BOOLEAN);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isBoolean(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a boolean", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isBoolean(VALUE))
			{
				consumeValue<boolean>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
