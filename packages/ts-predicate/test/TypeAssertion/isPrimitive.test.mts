import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

import { GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";


describe(
	"TypeAssertion.isPrimitive",
	(): void =>
	{
		it(
			"should return when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isPrimitive(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isPrimitive(ITEM);
					};

					throws(WRAPPER, createErrorTest());
				}
			}
		);
	}
);
