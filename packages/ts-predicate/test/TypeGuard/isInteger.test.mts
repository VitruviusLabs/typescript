import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isInteger } from "../../src/TypeGuard/isInteger.mjs";

import { BaseType, GroupType, getInvertedValues, getValues } from "../common/utils.mjs";

describe(
	"TypeGuard / isInteger",
	(): void =>
	{
		it(
			"should return true when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isInteger(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isInteger(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isInteger(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
