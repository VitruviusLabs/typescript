import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { createErrorTest } from "../common/createErrorTest.mjs";

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
				const WRAPPER_SINGLE = (): void =>
				{
					TypeAssertion.hasAllowedKeys({ a: 1, b: 2, c: 3 }, ["a", "b"]);
				};

				const WRAPPER_MULTIPLE = (): void =>
				{
					TypeAssertion.hasAllowedKeys({ a: 1, b: 2, c: 3, d: 4 }, ["a", "b"]);
				};

				throws(WRAPPER_SINGLE, createErrorTest(`The value must not have the properties "c".`));
				throws(WRAPPER_MULTIPLE, createErrorTest(`The value must not have the properties "c", "d".`));
			}
		);
	}
);
