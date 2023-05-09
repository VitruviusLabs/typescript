import { expect } from "chai";

import { describe, it } from "mocha";

import { isFiniteNumber } from "../../src/TypeGuard/isFiniteNumber.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isFiniteNumber",
	(): void =>
	{
		it(
			"should return true when given a real number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FINITE);

				for (const ITEM of VALUES)
				{
					expect(isFiniteNumber(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given +/-Infinity",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					expect(isFiniteNumber(ITEM)).to.be.false;
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
					expect(isFiniteNumber(ITEM)).to.be.false;
				}
			}
		);
	}
);
