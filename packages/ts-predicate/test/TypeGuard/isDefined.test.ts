import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isDefined } from "../../src/TypeGuard/isDefined.js";

import { BaseType, getInvertedValues, getValues } from "../utils.js";

describe(
	"TypeGuard / isDefined",
	(): void =>
	{
		it(
			"should return false when given undefined, null, or NaN",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isDefined(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isDefined(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);
	}
);
