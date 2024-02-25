import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeAssertion.isNumber",
	(): void =>
	{
		it(
			"should return when given a number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isNumber(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isNumber(ITEM);
					};

					throws(WRAPPER, createErrorTest());
				}
			}
		);
	}
);
