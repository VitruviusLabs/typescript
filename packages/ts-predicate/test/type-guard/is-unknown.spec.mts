import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createValue, getAllValues } from "@vitruvius-labs/testing-ground";
import { isUnknown } from "../../src/_index.mjs";

describe("isUnknown", (): void => {
	it("should always return true", (): void => {
		const VALUES: Array<unknown> = getAllValues();

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isUnknown(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should narrow the type to unknown", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isUnknown(VALUE))
			{
				consumeValue<unknown>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
