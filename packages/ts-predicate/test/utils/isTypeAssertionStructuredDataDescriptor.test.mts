import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isStructuredDataPropertyDescriptor } from "../../src/utils/isStructuredDataPropertyDescriptor.mjs";

import { GroupType, getInvertedValues, getValues, testError } from "../common/utils.mjs";

describe(
	"TypeGuard / common/utils / isTypeAssertionStructuredDataDescriptor",
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
						isStructuredDataPropertyDescriptor(ITEM, "test");
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
						isStructuredDataPropertyDescriptor(ITEM, "test");
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
