import { expect } from "chai";

import { describe, it } from "mocha";

import { isFiniteNumber } from "../../src/TypeAssertion/isFiniteNumber.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isFiniteNumber",
	(): void =>
	{
		it(
			"should return when given a real number",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.FINITE);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isFiniteNumber(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given +/-Infinity",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.INFINITY);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isFiniteNumber(ITEM);
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
							isFiniteNumber(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
