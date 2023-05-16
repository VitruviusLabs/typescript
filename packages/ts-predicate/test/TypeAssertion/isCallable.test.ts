import { doesNotThrow, throws } from "assert";

import { describe, it } from "node:test";

import { isCallable } from "../../src/TypeAssertion/isCallable.js";

import { BaseType, getInvertedValues, getValues, testError } from "../common/utils.js";

describe(
	"TypeAssertion / isCallable",
	(): void =>
	{
		it(
			"should return when given an arrow function",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isCallable(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isCallable(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
