import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isCallable } from "../../src/TypeGuard/isCallable.js";

import { BaseType, getInvertedValues, getValues } from "../utils.js";

describe(
	"TypeGuard / isCallable",
	(): void =>
	{
		it(
			"should return true when given an arrow function",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isCallable(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isCallable(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
