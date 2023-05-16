import { expect } from "chai";

import { describe, it } from "mocha";

import { isCallable } from "../../src/TypeAssertion/isCallable.js";

import { BaseType, getInvertedValues, getValues } from "../Utils.js";

describe(
	"TypeAssertion / isCallable",
	(): void =>
	{
		it(
			"should return when given an arrow function",
			(): void =>
			{
				const VALUES: Array<unknown> = getValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isCallable(ITEM);
						}
					).to.not.throw();
				}
			}
		);

		it(
			"should throw when given anything else",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(BaseType.CALLABLE);

				for (const ITEM of VALUES)
				{
					expect(
						(): void =>
						{
							isCallable(ITEM);
						}
					).to.throw(Error, /./);
				}
			}
		);
	}
);
