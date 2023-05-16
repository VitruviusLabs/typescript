import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isBoolean } from "../../src/TypeGuard/isBoolean.js";

import { BaseType, getInvertedValues, getValues } from "../common/utils.js";

describe(
	"TypeGuard / isBoolean",
	(): void =>
	{
		it(
			"should return true when given a boolean",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isBoolean(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isBoolean(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
