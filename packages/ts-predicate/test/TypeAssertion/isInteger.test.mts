import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion.isInteger",
	(): void =>
	{
		it(
			"should return when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isInteger(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						TypeAssertion.isInteger(ITEM);
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
						TypeAssertion.isInteger(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
