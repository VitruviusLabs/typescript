import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isTypeGuardPropertyDescriptor } from "../../../src/TypeGuard/utils/isTypeAssertionStructuredDataDescriptor.js";

import { GroupType, getInvertedValues, getValues } from "../../utils.js";

describe(
	"TypeGuard / utils / isTypeGuardPropertyDescriptor",
	(): void =>
	{
		it(
			"should return true when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isTypeGuardPropertyDescriptor(ITEM);

					strictEqual(RESULT, true);
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
					const RESULT: unknown = isTypeGuardPropertyDescriptor(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
