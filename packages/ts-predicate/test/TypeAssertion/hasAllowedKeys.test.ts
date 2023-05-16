import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { hasAllowedKeys } from "../../src/TypeAssertion/hasAllowedKeys.js";

import { testError } from "../utils.js";

describe(
	"TypeAssertion / hasAllowedKeys",
	(): void =>
	{
		it(
			"should return when every key is allowed, even if some allowed keys are missing",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					hasAllowedKeys({ a: 1, b: 2 }, ["a", "b", "c"]);
				};

				doesNotThrow(WRAPPER);
			}
		);

		it(
			"should throw when some keys are not allowed",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					hasAllowedKeys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
