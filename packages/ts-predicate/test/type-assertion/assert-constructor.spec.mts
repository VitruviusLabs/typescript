import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type AbstractConstructorOf, TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertConstructor", (): void => {
	it("should return when given a constructible", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.CONSTRUCTIBLE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertConstructor(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertConstructor(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value must be a constructor."));
		}
	});

	it("should narrow the type to a constructor (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertConstructor(VALUE);
			consumeValue<AbstractConstructorOf<object>>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a constructor (forced narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertConstructor<typeof Date>(VALUE);
			consumeValue<typeof Date>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a constructor (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: (typeof Date) | undefined = createValue();

			TypeAssertion.assertConstructor(VALUE);
			consumeValue<typeof Date>(VALUE);
		};

		throws(WRAPPER);
	});
});
