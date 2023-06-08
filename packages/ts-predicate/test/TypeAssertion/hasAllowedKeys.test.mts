import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion.hasAllowedKeys",
	(): void =>
	{
		it(
			"should return when every key is allowed, even if some allowed keys are missing",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasAllowedKeys({ a: 1, b: 2 }, ["a", "b", "c"]);
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
					TypeAssertion.hasAllowedKeys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
				};

				throws(WRAPPER, testError);
			}
		);
	}
);
