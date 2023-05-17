import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isPrimitive } from "../../src/TypeAssertion/isPrimitive.mjs";

import { BaseType, GroupType, getInvertedValues, getValues, testError } from "../common/utils.mjs";

describe(
	"TypeAssertion / isPrimitive",
	(): void =>
	{
		it(
			"should return when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isPrimitive(ITEM);
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should throw when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isPrimitive(ITEM);
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
