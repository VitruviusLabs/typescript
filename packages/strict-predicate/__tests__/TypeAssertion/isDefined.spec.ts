import { expect } from "chai";

import { describe, it } from "mocha";

import { isDefined } from "../../src/TypeAssertion/isDefined.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isDefined",
	(): void =>
	{
		it(
			"should throw when given undefined, null, or NaN",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isDefined(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should return when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.NULLISH);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isDefined(ITEM);
						}
					).to.not.throw();
				}
			}
		);
	}
);
