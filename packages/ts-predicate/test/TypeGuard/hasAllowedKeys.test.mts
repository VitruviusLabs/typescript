import { strictEqual } from "node:assert";

import { describe, it } from "node:test";

import { hasAllowedKeys } from "../../src/TypeGuard/hasAllowedKeys.mjs";

describe(
	"TypeGuard / hasAllowedKeys",
	(): void =>
	{
		it(
			"should return true when testing an empty object against an empty array of allowed keys",
			(): void =>
			{
				const RESULT: unknown = hasAllowedKeys({}, []);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return true when every key is allowed, even if some allowed keys are missing",
			(): void =>
			{
				const RESULT: unknown = hasAllowedKeys(
					{ a: 1, b: 2 },
					["a", "b", "c"]
				);

				strictEqual(RESULT, true);
			}
		);

		it(
			"should return false when some keys are not allowed",
			(): void =>
			{
				const RESULT: unknown = hasAllowedKeys(
					{ a: 1, b: 2, c: 3 },
					["a", "b"]
				);

				strictEqual(RESULT, false);
			}
		);
	}
);
