import { expect } from "chai";

import { describe, it } from "mocha";

import { isFunction } from "../../src/TypeAssertion/isFunction.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isFunction",
	(): void =>
	{
		it(
			"should return when given a function (arrow, regular, or constructor)",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isFunction(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isFunction(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
