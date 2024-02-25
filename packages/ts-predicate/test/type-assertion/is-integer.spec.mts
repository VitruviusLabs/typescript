import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

describe(
	"TypeAssertion.isInteger",
	(): void =>
	{
		it(
			"should return when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.INTEGER);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isInteger(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.REAL, GroupType.INFINITY);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isInteger(ITEM);
					};

					throws(WRAPPER, createErrorTest());
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
						TypeAssertion.isInteger(ITEM);
					};

					throws(WRAPPER, createErrorTest());
				}
			}
		);
	}
);
