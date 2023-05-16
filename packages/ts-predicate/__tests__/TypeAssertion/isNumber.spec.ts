import { expect } from "chai";

import { describe, it } from "mocha";

import { isNumber } from "../../src/TypeAssertion/isNumber.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isNumber",
	(): void =>
	{
		it(
			"should return when given a number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isNumber(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isNumber(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
