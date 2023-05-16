import { expect } from "chai";

import { describe, it } from "mocha";

import { isCallable } from "../../src/TypeGuard/isCallable.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeGuard / isCallable",
	(): void =>
	{
		it(
			"should return true when given an arrow function",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					expect(isCallable(ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return false when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					expect(isCallable(ITEM)).to.be.false;
				}
			}
		);
	}
);
