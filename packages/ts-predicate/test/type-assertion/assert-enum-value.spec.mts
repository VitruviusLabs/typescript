import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { GroupType, consumeValue, createErrorTest, createValue, getInvertedValues } from "@vitruvius-labs/testing-ground";
import { assertEnumValue } from "../../src/_index.mjs";

describe("assertEnumValue", (): void => {
	it("should return when given a valid value", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<number> = ENUM_VALUES;

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertEnumValue(ITEM, ENUM_VALUES);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				assertEnumValue(ITEM, ENUM_VALUES);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should customize the error message when given an enum name", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		const WRAPPER_ANONYMOUS = (): void =>
		{
			assertEnumValue("Lorem ipsum", ENUM_VALUES);
		};

		const WRAPPER_NAMED = (): void =>
		{
			assertEnumValue("Lorem ipsum", ENUM_VALUES, "DigitEnum");
		};

		throws(WRAPPER_ANONYMOUS, createErrorTest("The value must be one of the following: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9."));
		throws(WRAPPER_NAMED, createErrorTest("The value must be a DigitEnum."));
	});

	it("should narrow the type to the enumerated values (arbitrary values)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertEnumValue(VALUE, ["lorem ipsum"]);
			consumeValue<string>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to the enumerated values (arbitrary constant)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: unknown = createValue();

			assertEnumValue(VALUE, ["lorem ipsum"] as const);
			consumeValue<"lorem ipsum">(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to the enumerated values (enum values)", (): void => {
		const WRAPPER = (): void =>
		{
			const enum DummyEnum
			{
				MESSAGE = "lorem ipsum",
			}

			const VALUE: unknown = createValue();

			assertEnumValue(VALUE, [DummyEnum.MESSAGE]);
			consumeValue<DummyEnum>(VALUE);
		};

		throws(WRAPPER);
	});

	it("should narrow the type to the enumerated values (implicit narrowing)", (): void => {
		const WRAPPER = (): void =>
		{
			const VALUE: string | undefined = createValue();

			assertEnumValue(VALUE, ["lorem ipsum"]);
			consumeValue<string>(VALUE);
		};

		throws(WRAPPER);
	});
});
