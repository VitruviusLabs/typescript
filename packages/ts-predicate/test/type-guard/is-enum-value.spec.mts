import { doesNotThrow, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { TypeGuard } from "../../src/_index.mjs";

describe("TypeGuard.isEnumValue", (): void => {
	it("should return true when given a valid value", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<number> = ENUM_VALUES;

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isEnumValue(ITEM, ENUM_VALUES), true);
		}
	});

	it("should return false when given anything else", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			strictEqual(TypeGuard.isEnumValue(ITEM, ENUM_VALUES), false);
		}
	});

	it("should narrow the type to the enumerated values (arbitrary values)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isEnumValue(VALUE, ["lorem ipsum"]))
			{
				consumeValue<string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to the enumerated values (arbitrary constant)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			if (TypeGuard.isEnumValue(VALUE, ["lorem ipsum"] as const))
			{
				consumeValue<"lorem ipsum">(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to the enumerated values (enum values)", (): void => {
		const WRAPPER = (): void =>
		{
			const enum DummyEnum
			{
				MESSAGE = "lorem ipsum",
			}

			const VALUE: unknown = createValue();

			if (TypeGuard.isEnumValue(VALUE, [DummyEnum.MESSAGE]))
			{
				consumeValue<DummyEnum>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});

	it("should narrow the type to the enumerated values (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: string | undefined = createValue();

			if (TypeGuard.isEnumValue(VALUE, ["lorem ipsum"]))
			{
				consumeValue<string>(VALUE);
			}
		};

		doesNotThrow(WRAPPER);
	});
});
