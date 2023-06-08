import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { TypeGuard } from "../../src/index.mjs";

import { GroupType, getInvertedValues, getValues } from "../common/getValues.mjs";

describe(
	"TypeGuard.isObject",
	(): void =>
	{
		it(
			"should return true when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = TypeGuard.isObject(ITEM);

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
					const RESULT: unknown = TypeGuard.isObject(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
