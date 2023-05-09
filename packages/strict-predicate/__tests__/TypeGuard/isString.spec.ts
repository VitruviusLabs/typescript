import { expect } from "chai";

import { describe, it } from "mocha";

import { isString } from "../../src/TypeGuard/isString.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isString",
	(): void =>
	{
		it(
			"should return true when given a string",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					expect(isString(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					expect(isString(ITEM)).to.be.false;
				}
			}
		);
	}
);
