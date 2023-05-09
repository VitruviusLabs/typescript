import { expect } from "chai";

import { describe, it } from "mocha";

import { isString } from "../../src/TypeAssertion/isString.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isString",
	(): void =>
	{
		it(
			"should return when given a string",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isString(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.STRING);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isString(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
