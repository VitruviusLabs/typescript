import { expect } from "chai";

import { describe, it } from "mocha";

import { isPrimitive } from "../../src/TypeAssertion/isPrimitive.js";

import { BaseType, GroupType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isPrimitive",
	(): void =>
	{
		it(
			"should return when given a primitive value",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isPrimitive(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given a composite value",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.SYMBOL, GroupType.OBJECT, GroupType.FUNCTION_CLASS);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isPrimitive(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
