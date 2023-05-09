import { expect } from "chai";

import { describe, it } from "mocha";

import { hasNullableProperty } from "../../src/TypeAssertion/hasNullableProperty.js";

describe(
	"TypeAssertion / hasNullableProperty",
	(): void =>
	{
		it(
			"should throw when given an object without the property",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasNullableProperty({}, "answer");
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when given an object with the property",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasNullableProperty({ answer: undefined }, "answer");
					}
				).to.not.throw();
			}
		);
	}
);
