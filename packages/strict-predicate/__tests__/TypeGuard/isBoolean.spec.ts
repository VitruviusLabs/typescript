import { expect } from "chai";

import { describe, it } from "mocha";

import { isBoolean } from "../../src/TypeGuard/isBoolean.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isBoolean",
	(): void =>
	{
		it(
			"should return true when given a boolean",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					expect(isBoolean(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					expect(isBoolean(ITEM)).to.be.false;
				}
			}
		);
	}
);
