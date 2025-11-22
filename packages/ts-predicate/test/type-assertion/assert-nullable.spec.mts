import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { NoValue, assertNullable } from "../../src/_index.mjs";

describe("assertNullable", (): void => {
	it("should return when given null or undefined", (): void => {
		const VALUES: Array<unknown> = [null, undefined];

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertNullable(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NULLISH);

		VALUES.push(Number.NaN);
		VALUES.push(NoValue);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertNullable(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a nullable value (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue(0);

			assertNullable(VALUE);
			consumeValue<null | undefined>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a nullable value (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: number | undefined = createValue(0);

			assertNullable(VALUE);
			consumeValue<undefined>(VALUE);
		};

		throws(WRAPPER);
	});
});
