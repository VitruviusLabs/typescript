import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { hasNullableProperty } from "../../src/TypeGuard/hasNullableProperty.js";

describe(
	"TypeGuard / hasNullableProperty",
	(): void =>
	{
		it(
			"should return false when given an object without the property",
			(): void =>
			{
				const RESULT: unknown = hasNullableProperty({}, "answer");

				strictEqual(RESULT, false);
			}
		);

		it(
			"should return true when given an object with the property",
			(): void =>
			{
				const RESULT: unknown = hasNullableProperty({ answer: undefined }, "answer");

				strictEqual(RESULT, true);
			}
		);
	}
);
