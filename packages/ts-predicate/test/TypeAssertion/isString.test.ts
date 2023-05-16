import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isString } from "../../src/TypeAssertion/isString.js";

import { BaseType, getInvertedValues, getValues, testError } from "../common/utils.js";

describe(
	"TypeAssertion / isString",
	(): void =>
	{
		it(
			"should return when given a string",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isString(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isString(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
