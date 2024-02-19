import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

import { BaseType, getInvertedValues, getValues } from "../common/getValues.mjs";

describe(
	"TypeAssertion.isDefined",
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
						TypeAssertion.isDefined(ITEM);
					};

					throws(WRAPPER, createErrorTest());
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
						TypeAssertion.isDefined(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);
	}
);
