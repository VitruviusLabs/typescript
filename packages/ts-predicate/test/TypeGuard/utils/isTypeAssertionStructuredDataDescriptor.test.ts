import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { isTypeGuardPropertyDescriptor } from "../../../src/TypeGuard/utils/isTypeAssertionStructuredDataDescriptor.js";

import { GroupType, getInvertedValues, getValues, testError } from "../../common/utils.js";

describe(
	"TypeGuard / common/utils / isTypeGuardPropertyDescriptor",
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
						isTypeGuardPropertyDescriptor(ITEM, "test");
					};

					doesNotThrow(WRAPPER);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const WRAPPER = (): void =>
					{
						isTypeGuardPropertyDescriptor(ITEM, "test");
					};

					throws(WRAPPER, testError);
				}
			}
		);
	}
);
