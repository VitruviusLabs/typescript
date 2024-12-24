import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertPrimitive", (): void => {
	it("should return when given a primitive value", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertPrimitive(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given a composite value", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertPrimitive(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to a primitive (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue({});

			TypeAssertion.assertPrimitive(VALUE);
			consumeValue<bigint | boolean | number | string | null | undefined>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a primitive (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | number | string = createValue({});

			TypeAssertion.assertPrimitive(VALUE);
			consumeValue<number | string>(VALUE);
		};

		throws(WRAPPER);
	});
});
