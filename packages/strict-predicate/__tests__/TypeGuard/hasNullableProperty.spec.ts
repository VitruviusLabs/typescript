import { expect } from "chai";

import { describe, it } from "mocha";

import { hasNullableProperty } from "../../src/TypeGuard/hasNullableProperty.js";

describe(
	"TypeGuard / hasNullableProperty",
	(): void =>
	{
		it(
			"should return false when given an object without the property",
			(): void =>
			{
				expect(hasNullableProperty({}, "answer")).to.be.false;
			}
		);

		it(
			"should return true when given an object with the property",
			(): void =>
			{
				expect(hasNullableProperty({ answer: undefined }, "answer")).to.be.true;
			}
		);
	}
);
