import { doesNotThrow } from "node:assert";
import { describe, it } from "node:test";
import { consumeValue, createValue, getAllValues } from "@vitruvius-labs/testing-ground";
import { assertUnknown } from "../../src/_index.mjs";

describe("assertUnknown", (): void => {
	it("should return when given anything", (): void => {
		const VALUES: Array<unknown> = getAllValues();

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUnknown(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should narrow the type to unknown", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertUnknown(VALUE);
			consumeValue<unknown>(VALUE);
		};

		doesNotThrow(WRAPPER);
	});
});
