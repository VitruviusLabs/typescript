import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertObject", (): void => {
	it("should return when given an object", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertObject(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY_OBJECT);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertObject(ITEM);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should narrow the type to an object (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertObject(VALUE);
			consumeValue<object>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to an object (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: Date | undefined = createValue();

			TypeAssertion.assertObject(VALUE);
			consumeValue<Date>(VALUE);
		};

		throws(WRAPPER);
	});
});
