import { expect } from "chai";

import { describe, it } from "mocha";

import { isBoolean } from "../../src/TypeAssertion/isBoolean.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isBoolean",
	(): void =>
	{
		it(
			"should return when given a boolean",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isBoolean(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.BOOLEAN);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isBoolean(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
