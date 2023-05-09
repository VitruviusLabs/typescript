import { expect } from "chai";

import { describe, it } from "mocha";

import { hasProperty } from "../../src/TypeGuard/hasProperty.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / hasProperty",
	(): void =>
	{
		it(
			"should return false when given an object without the property",
			(): void =>
			{
				expect(hasProperty({}, "answer")).to.be.false;
			}
		);

		it(
			"should return false when given an object with the property, but the property is nullish",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					expect(hasProperty({ answer: ITEM }, "answer")).to.be.false;
				}
			}
		);

		it(
			"should return true when given an object with the property and the property is not nullish",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					expect(hasProperty({ answer: ITEM }, "answer")).to.be.true;
				}
			}
		);
	}
);
