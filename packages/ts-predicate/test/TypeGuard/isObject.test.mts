import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isObject } from "../../src/TypeGuard/isObject.mjs";

import { GroupType, getInvertedValues, getValues } from "../common/utils.mjs";

describe(
	"TypeGuard / isObject",
	(): void =>
	{
		it(
			"should return true when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isObject(ITEM);

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
					const RESULT: unknown = isObject(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
