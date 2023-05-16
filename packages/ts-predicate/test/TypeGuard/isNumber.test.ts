import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isNumber } from "../../src/TypeGuard/isNumber.js";

import { GroupType, getInvertedValues, getValues } from "../common/utils.js";

describe(
	"TypeGuard / isNumber",
	(): void =>
	{
		it(
			"should return true when given a number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isNumber(ITEM);

					strictEqual(RESULT, true);
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
					const RESULT: unknown = isNumber(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
