import { expect } from "chai";

import { describe, it } from "mocha";

import { hasAllowedKeys } from "../../src/TypeGuard/hasAllowedKeys.js";

describe(
	"TypeGuard / hasAllowedKeys",
	(): void =>
	{
		it(
			"should return true when every key is allowed, even if some allowed keys are missing",
			(): void =>
			{
				expect(hasAllowedKeys({ a: 1, b: 2 }, ["a", "b", "c"])).to.be.true;
			}
		);

		it(
			"should return false when some keys are not allowed",
			(): void =>
			{
				expect(hasAllowedKeys({ a: 1, b: 2, c: 3 }, ["a", "b"])).to.be.false;
			}
		);
	}
);
