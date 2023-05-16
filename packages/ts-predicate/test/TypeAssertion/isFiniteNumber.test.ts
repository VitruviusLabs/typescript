import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isFiniteNumber } from "../../src/TypeAssertion/isFiniteNumber.js";

import { BaseType, GroupType, getInvertedValues, getValues, testError } from "../utils.js";

describe(
	"TypeAssertion / isFiniteNumber",
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
						isFiniteNumber(ITEM);
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
						isFiniteNumber(ITEM);
					};

					throws(WRAPPER, testError);
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
						isFiniteNumber(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
