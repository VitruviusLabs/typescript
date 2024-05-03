import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertEnumValue", (): void => {
	it("should return when given a valid value", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const VALUES: Array<number> = ENUM_VALUES;

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.assertEnumValue(ITEM, ENUM_VALUES);
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
				TypeAssertion.assertEnumValue(ITEM, ENUM_VALUES);
			};

			throws(WRAPPER, createErrorTest());
		}
	});

	it("should customize the error message when given an enum name", (): void => {
		const ENUM_VALUES: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		const WRAPPER_ANONYMOUS = (): void =>
		{
			TypeAssertion.assertEnumValue("Lorem ipsum", ENUM_VALUES);
		};

		const WRAPPER_NAMED = (): void =>
		{
			TypeAssertion.assertEnumValue("Lorem ipsum", ENUM_VALUES, "DigitEnum");
		};

		throws(WRAPPER_ANONYMOUS, createErrorTest("The value must be one of the following: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9."));
		throws(WRAPPER_NAMED, createErrorTest("The value must be a DigitEnum."));
	});
});
