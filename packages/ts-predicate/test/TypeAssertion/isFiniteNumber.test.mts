import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

describe(
	"TypeAssertion.isFiniteNumber",
	(): void =>
	{
		it(
			"should return when given a real number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FINITE);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isFiniteNumber(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given +/-Infinity",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isFiniteNumber(ITEM);
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
						TypeAssertion.isFiniteNumber(ITEM);
					};

					throws(WRAPPER, createErrorTest());
				}
			}
		);
	}
);
