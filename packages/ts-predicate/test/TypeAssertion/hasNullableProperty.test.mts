import { doesNotThrow, throws } from "node:assert";

import { describe, it } from "node:test";

import { hasNullableProperty } from "../../src/TypeAssertion/hasNullableProperty.mjs";

import { testError } from "../common/utils.mjs";

describe(
	"TypeAssertion / hasNullableProperty",
	(): void =>
	{
		it(
			"should throw when given an object without the property",
			(): void =>
			{
				const WRAPPER = (): void =>
				{
					hasNullableProperty({}, "answer");
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
					hasNullableProperty({ answer: undefined }, "answer");
				};

				doesNotThrow(WRAPPER);
			}
		);
	}
);
