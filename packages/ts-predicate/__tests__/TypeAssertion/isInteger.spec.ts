import { expect } from "chai";

import { describe, it } from "mocha";

import { isInteger } from "../../src/TypeAssertion/isInteger.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isInteger",
	(): void =>
	{
		it(
			"should return when given a safe integer",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INTEGER);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isInteger(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given any other number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.REAL, BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isInteger(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.NUMBER);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isInteger(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
