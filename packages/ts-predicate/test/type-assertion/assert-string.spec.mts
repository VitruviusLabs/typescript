import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertString } from "../../src/_index.mjs";

describe("assertString", (): void => {
	it("should return when given a string", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertString(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertString(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a string", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertString(VALUE);
			consumeValue<string>(VALUE);
		};

		throws(WRAPPER);
	});
});
