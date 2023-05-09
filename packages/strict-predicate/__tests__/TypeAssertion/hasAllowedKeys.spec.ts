import { expect } from "chai";

import { describe, it } from "mocha";

import { hasAllowedKeys } from "../../src/TypeAssertion/hasAllowedKeys.js";

describe(
	"TypeAssertion / hasAllowedKeys",
	(): void =>
	{
		it(
			"should return when every key is allowed, even if some allowed keys are missing",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasAllowedKeys({ a: 1, b: 2 }, ["a", "b", "c"]);
					}
				).to.not.throw();
			}
		);

		it(
			"should throw when some keys are not allowed",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasAllowedKeys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
					}
				).to.throw(Error, /./);
			}
		);
	}
);
