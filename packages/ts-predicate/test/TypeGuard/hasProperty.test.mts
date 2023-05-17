import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { hasProperty } from "../../src/TypeGuard/hasProperty.mjs";

import { BaseType, getInvertedValues, getValues } from "../common/utils.mjs";

describe(
	"TypeGuard / hasProperty",
	(): void =>
	{
		it(
			"should return false when given an object without the property",
			(): void =>
			{
				const RESULT: unknown = hasProperty({}, "answer");

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return false when given an object with the property, but the property is nullish",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = hasProperty({ answer: ITEM }, "answer");

					strictEqual(RESULT, false);
				}
			}
		);

		it(
			"should return true when given an object with the property and the property is not nullish",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					const RESULT: unknown = hasProperty({ answer: ITEM }, "answer");

					strictEqual(RESULT, true);
				}
			}
		);
	}
);
