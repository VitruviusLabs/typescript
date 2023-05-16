import { expect } from "chai";

import { describe, it } from "mocha";

import { hasProperty } from "../../src/TypeAssertion/hasProperty.js";

describe(
	"TypeAssertion / hasProperty",
	(): void =>
	{
		it(
			"should throw when given an object without the property",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasProperty({}, "answer");
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should throw when given an object with the property, but the value is nullish",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasProperty({ answer: undefined }, "answer");
					}
				).to.throw(Error, /./);
			}
		);

		it(
			"should return when given an object with the property and the value is not nullish",
			(): void =>
			{
				expect(
					(): void =>
					{
						hasProperty({ answer: 42 }, "answer");
					}
				).to.not.throw();
			}
		);
	}
);
