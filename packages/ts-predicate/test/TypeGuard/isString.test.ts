import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isString } from "../../src/TypeGuard/isString.js";

import { BaseType, getInvertedValues, getValues } from "../utils.js";

describe(
	"TypeGuard / isString",
	(): void =>
	{
		it(
			"should return true when given a string",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isString(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isString(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
