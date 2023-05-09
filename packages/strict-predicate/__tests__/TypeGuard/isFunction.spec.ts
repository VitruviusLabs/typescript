import { expect } from "chai";

import { describe, it } from "mocha";

import { isFunction } from "../../src/TypeGuard/isFunction.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isFunction",
	(): void =>
	{
		it(
			"should return true when given a function (arrow, regular, or constructor)",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(isFunction(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(isFunction(ITEM)).to.be.false;
				}
			}
		);
	}
);
