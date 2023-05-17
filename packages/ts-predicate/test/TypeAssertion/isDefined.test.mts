import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isDefined } from "../../src/TypeAssertion/isDefined.mjs";

import { BaseType, getInvertedValues, getValues, testError } from "../common/utils.mjs";

describe(
	"TypeAssertion / isDefined",
	(): void =>
	{
		it(
			"should throw when given undefined, null, or NaN",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isDefined(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);

		it(
			"should return when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isDefined(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);
	}
);
