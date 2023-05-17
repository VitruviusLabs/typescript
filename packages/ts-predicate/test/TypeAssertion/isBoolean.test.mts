import { doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { isBoolean } from "../../src/TypeAssertion/isBoolean.mjs";

import { BaseType, getInvertedValues, getValues, testError } from "../common/utils.mjs";

describe(
	"TypeAssertion / isBoolean",
	(): void =>
	{
		it(
			"should return when given a boolean",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isBoolean(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isBoolean(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
