import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isObject } from "../../src/TypeAssertion/isObject.mjs";

import { GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion / isObject",
	(): void =>
	{
		it(
			"should return when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isObject(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isObject(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
