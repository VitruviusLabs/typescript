import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isFunction } from "../../src/TypeAssertion/isFunction.js";

import { GroupType, getInvertedValues, getValues, testError } from "../common/utils.js";

describe(
	"TypeAssertion / isFunction",
	(): void =>
	{
		it(
			"should return when given a function (arrow, regular, or constructor)",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isFunction(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isFunction(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
