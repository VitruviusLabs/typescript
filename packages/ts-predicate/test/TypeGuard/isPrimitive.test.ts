import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { isPrimitive } from "../../src/TypeGuard/isPrimitive.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../utils.js";

describe(
	"TypeGuard / isPrimitive",
	(): void =>
	{
		it(
			"should return true when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isPrimitive(ITEM);

					strictEqual(RESULT, true);
				}
			}
		);

		it(
			"should return false when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = isPrimitive(ITEM);

					strictEqual(RESULT, false);
				}
			}
		);
	}
);
