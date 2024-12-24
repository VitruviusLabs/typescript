import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type Callable, TypeAssertion } from "../../src/_index.mjs";

describe("TypeAssertion.assertCallable", (): void => {
	it("should return when given a callable", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.CALLABLE);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertCallable(ITEM);
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
				TypeAssertion.assertCallable(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value must be a callable."));
		}
	});

	it("should narrow the type to a callable (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertCallable(VALUE);
			consumeValue<Callable>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a callable (forced narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			TypeAssertion.assertCallable<() => void>(VALUE);
			consumeValue<() => void>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to a callable (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: (() => void) | undefined = createValue();

			TypeAssertion.assertCallable(VALUE);
			consumeValue<() => void>(VALUE);
		};

		throws(WRAPPER);
	});
});
