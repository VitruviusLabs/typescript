import { expect } from "chai";

import { describe, it } from "mocha";

import { isObject } from "../../src/TypeGuard/isObject.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isObject",
	(): void =>
	{
		it(
			"should return true when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(isObject(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(isObject(ITEM)).to.be.false;
				}
			}
		);
	}
);
