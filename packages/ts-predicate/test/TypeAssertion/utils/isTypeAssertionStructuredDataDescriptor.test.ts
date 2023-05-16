import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isTypeAssertionStructuredDataDescriptor } from "../../../src/TypeAssertion/utils/isTypeAssertionStructuredDataDescriptor.js";

import { GroupType, getInvertedValues, getValues, testError } from "../../utils.js";

describe(
	"TypeGuard / utils / isTypeAssertionStructuredDataDescriptor",
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
						isTypeAssertionStructuredDataDescriptor(ITEM, "test");
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
						isTypeAssertionStructuredDataDescriptor(ITEM, "test");
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
