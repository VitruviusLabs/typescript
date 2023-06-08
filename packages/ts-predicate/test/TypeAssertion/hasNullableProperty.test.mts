import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { TypeAssertion } from "../../src/index.mjs";

import { testError } from "../common/testError.mjs";

describe(
	"TypeAssertion.hasNullableProperty",
	(): void =>
	{
		it(
			"should throw when given an object without the property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasNullableProperty({}, "answer");
				};

				throws(WRAPPER, testError);
			}
		);

		it(
			"should return when given an object with the property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					TypeAssertion.hasNullableProperty({ answer: undefined }, "answer");
				};

				doesNotThrow(WRAPPER);
			}
		);
	}
);
