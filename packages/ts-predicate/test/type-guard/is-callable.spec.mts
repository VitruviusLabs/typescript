import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type Callable, isCallable } from "../../src/_index.mjs";

describe("isCallable", (): void => {
	it("should return true when given a callable", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.CALLABLE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isCallable(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = isCallable(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a callable (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isCallable(VALUE))
			{
				consumeValue<Callable>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a callable (forced narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (isCallable<() => void>(VALUE))
			{
				consumeValue<() => void>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a callable (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: (() => void) | undefined = createValue();

			if (isCallable(VALUE))
			{
				consumeValue<() => void>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
