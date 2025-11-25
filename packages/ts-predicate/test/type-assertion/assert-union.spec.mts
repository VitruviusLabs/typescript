import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { assertNumber, assertString, assertUnion } from "../../src/_index.mjs";

describe("assertUnion", (): void => {
	it("should return when given a value matching one of the test", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.NUMBER, GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUnion(ITEM, [assertNumber, assertString]);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER, GroupType.STRING);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertUnion(ITEM, [assertNumber, assertString]);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to the union of types (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertUnion(VALUE, [assertNumber, assertString]);
			consumeValue<number | string>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to the union of types (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: string | undefined = createValue();

			assertUnion(VALUE, [assertNumber, assertString]);
			consumeValue<string>(VALUE);
		};

		throws(WRAPPER);
	});
});
