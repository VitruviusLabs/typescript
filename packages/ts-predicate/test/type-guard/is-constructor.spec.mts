import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";
import { type AbstractConstructorOf, TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isConstructor", (): void => {
	it("should return true when given a constructible", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.CONSTRUCTIBLE);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isConstructor(ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return false when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION);

		for (const ITEM of VALUES)
		{
			const RESULT: unknown = TypeGuard.isConstructor(ITEM);

			strictEqual(RESULT, false);
		}
	});

	it("should narrow the type to a constructor (default)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isConstructor(VALUE))
			{
				consumeValue<AbstractConstructorOf<object>>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a constructor (forced narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isConstructor<typeof Date>(VALUE))
			{
				consumeValue<typeof Date>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to a constructor (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: (typeof Date) | undefined = createValue();

			if (TypeGuard.isConstructor(VALUE))
			{
				consumeValue<typeof Date>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
