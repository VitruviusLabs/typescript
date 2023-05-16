import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isNumber } from "../../src/TypeAssertion/isNumber.js";

import { GroupType, getInvertedValues, getValues, testError } from "../utils.js";

describe(
	"TypeAssertion / isNumber",
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
						isNumber(ITEM);
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
						isNumber(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
