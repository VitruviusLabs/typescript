import { expect } from "chai";

import { describe, it } from "mocha";

import { isNumber } from "../../src/TypeGuard/isNumber.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isNumber",
	(): void =>
	{
		it(
			"should return true when given a number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					expect(isNumber(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					expect(isNumber(ITEM)).to.be.false;
				}
			}
		);
	}
);
