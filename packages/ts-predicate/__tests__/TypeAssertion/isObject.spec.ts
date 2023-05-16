import { expect } from "chai";

import { describe, it } from "mocha";

import { isObject } from "../../src/TypeAssertion/isObject.js";

import { GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isObject",
	(): void =>
	{
		it(
			"should return when given an object",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isObject(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(GroupType.OBJECT);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isObject(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
