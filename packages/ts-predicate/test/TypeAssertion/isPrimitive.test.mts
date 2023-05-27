import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isPrimitive } from "../../src/TypeAssertion/isPrimitive.mjs";

import { GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion / isPrimitive",
	(): void =>
	{
		it(
			"should return when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.PRIMITIVE);

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
				const VALUES: Array<unknown> = getInvertedValues(GroupType.PRIMITIVE);

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
