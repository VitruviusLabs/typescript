import { expect } from "chai";

import { describe, it } from "mocha";

import { isPrimitive } from "../../src/TypeGuard/isPrimitive.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isPrimitive",
	(): void =>
	{
		it(
			"should return true when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(isPrimitive(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(isPrimitive(ITEM)).to.be.false;
				}
			}
		);
	}
);
