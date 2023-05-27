import { doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { isBigInt } from "../../src/TypeAssertion/isBigInt.mjs";

import { BaseType, getInvertedValues, getValues } from "../common/getValues.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion / isBigInt",
	(): void =>
	{
		it(
			"should return when given a big integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BIG_INT);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isBigInt(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.BIG_INT);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isBigInt(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
