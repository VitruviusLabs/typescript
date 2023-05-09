import { expect } from "chai";

import { describe, it } from "mocha";

import { isInteger } from "../../src/TypeGuard/isInteger.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isInteger",
	(): void =>
	{
		it(
			"should return true when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

				for (const ITEM of VALUES)
				{
					expect(isInteger(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					expect(isInteger(ITEM)).to.be.false;
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
					expect(isInteger(ITEM)).to.be.false;
				}
			}
		);
	}
);
