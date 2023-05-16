import { expect } from "chai";

import { describe, it } from "mocha";

import { isSimilar } from "../../src/Helper/isSimilar.js";

import { BaseType, DummyClass, GroupType, getInvertedValues } from "../Utils.js";

describe(
	"Helper / IsSimilar",
	(): void =>
	{
		it(
			"should return true when given the same value twice",
			(): void =>
			{
				const ALL_VALUES: Array<unknown> = getInvertedValues();

				for (const ITEM of ALL_VALUES)
				{
					expect(isSimilar(ITEM, ITEM)).to.be.true;
				}
			}
		);

		it(
			"should return true when given similar primitives or similar records",
			(): void =>
			{
				const VALUES_LEFT: Array<unknown> = getInvertedValues(
					BaseType.SYMBOL,
					BaseType.INSTANTIATED,
					GroupType.FUNCTION_CLASS,
				);

				const VALUES_RIGHT: Array<unknown> = getInvertedValues(
					BaseType.SYMBOL,
					BaseType.INSTANTIATED,
					GroupType.FUNCTION_CLASS,
				);

				for (let i: number = 0; i < VALUES_LEFT.length; ++i)
				{
					expect(isSimilar(VALUES_LEFT[i], VALUES_RIGHT[i])).to.be.true;
				}

				expect(isSimilar(0, -0)).to.be.true;
				expect(isSimilar(-0, 0)).to.be.true;
			}
		);

		it(
			"should return false when given different primitives",
			(): void =>
			{
				const VALUES: Array<unknown> = getInvertedValues(
					BaseType.SYMBOL,
					GroupType.OBJECT,
					GroupType.FUNCTION_CLASS,
				);

				for (let i: number = 1; i < VALUES.length; ++i)
				{
					for (let j: number = 0; j < i; ++j)
					{
						// Ignore -0 === 0 case
						if (VALUES[i] !== 0 || VALUES[j] !== 0)
						{
							expect(isSimilar(VALUES[i], VALUES[j])).to.be.false;
							expect(isSimilar(VALUES[j], VALUES[i])).to.be.false;
						}
					}
				}
			}
		);

		it(
			"should return false when given different arrays or records",
			(): void =>
			{
				expect(isSimilar({}, { answer: 42 })).to.be.false;
				expect(isSimilar({ answer: 42 }, {})).to.be.false;

				expect(isSimilar({ answer: 0 }, { answer: 42 })).to.be.false;
				expect(isSimilar({ answer: 42 }, { answer: 0 })).to.be.false;

				expect(isSimilar([0], [1])).to.be.false;
				expect(isSimilar([1], [0])).to.be.false;
			}
		);

		it(
			"should return false when given symbols, or interchangeable functions, classes, or objects",
			(): void =>
			{
				const VALUES_LEFT: Array<unknown> = [
					Symbol(),
					new DummyClass(),
					(): void =>
					{},
					class
					{},
				];

				const VALUES_RIGHT: Array<unknown> = [
					Symbol(),
					new DummyClass(),
					(): void =>
					{},
					class
					{},
				];

				for (let i: number = 0; i < VALUES_LEFT.length; ++i)
				{
					expect(isSimilar(VALUES_LEFT[i], VALUES_RIGHT[i])).to.be.false;
				}
			}
		);
	}
);
