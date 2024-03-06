import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Helper } from "../../src/_index.mjs";
import { GroupType, getAllValues, getInvertedValues } from "@vitruvius-labs/testing-ground";

describe("Helper.isSimilar", (): void => {
	it("should return true when given the same value twice", (): void => {
		const ALL_VALUES: Array<unknown> = getAllValues();

		for (const ITEM of ALL_VALUES)
		{
			const RESULT: unknown = Helper.isSimilar(ITEM, ITEM);

			strictEqual(RESULT, true);
		}
	});

	it("should return true when given similar primitives or similar records", (): void => {
		const VALUES_LEFT: Array<unknown> = getInvertedValues(
			GroupType.SYMBOL,
			GroupType.INSTANTIATED,
			GroupType.FUNCTION_CLASS
		);

		const VALUES_RIGHT: Array<unknown> = getInvertedValues(
			GroupType.SYMBOL,
			GroupType.INSTANTIATED,
			GroupType.FUNCTION_CLASS
		);

		for (let i: number = 0; i < VALUES_LEFT.length; ++i)
		{
			const RESULT: unknown = Helper.isSimilar(VALUES_LEFT[i], VALUES_RIGHT[i]);

			strictEqual(RESULT, true);
		}
	});

	it("should return true when given a zero and a negative zero", (): void => {
		strictEqual(Helper.isSimilar(0, -0), true);
		strictEqual(Helper.isSimilar(-0, 0), true);
	});

	it("should return false when given different primitives", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(
			GroupType.SYMBOL,
			GroupType.OBJECT,
			GroupType.FUNCTION_CLASS
		);

		for (let i: number = 1; i < VALUES.length; ++i)
		{
			for (let j: number = 0; j < i; ++j)
			{
				// Ignore -0 === 0 case
				if (VALUES[i] !== 0 || VALUES[j] !== 0)
				{
					const RESULT_RECTO: unknown = Helper.isSimilar(VALUES[i], VALUES[j]);
					const RESULT_VERSO: unknown = Helper.isSimilar(VALUES[j], VALUES[i]);

					strictEqual(RESULT_RECTO, false);
					strictEqual(RESULT_VERSO, false);
				}
			}
		}
	});

	it("should return false when given records with different properties", (): void => {
		strictEqual(Helper.isSimilar({}, { answer: 42 }), false);
		strictEqual(Helper.isSimilar({ answer: 42 }, {}), false);
	});

	it("should return false when given records with the same properties, but different values", (): void => {
		strictEqual(Helper.isSimilar({ answer: 0 }, { answer: 42 }), false);
		strictEqual(Helper.isSimilar({ answer: 42 }, { answer: 0 }), false);
	});

	it("should return false when given arrays of different lengths", (): void => {
		strictEqual(Helper.isSimilar([], [1]), false);
		strictEqual(Helper.isSimilar([1], []), false);
	});

	it("should return false when given arrays of the same lengths, but with different values", (): void => {
		strictEqual(Helper.isSimilar([0], [1]), false);
		strictEqual(Helper.isSimilar([1], [0]), false);
	});

	it("should return false when given symbols, or interchangeable functions, classes, or objects", (): void => {
		const VALUES_LEFT: Array<unknown> = [
			Symbol(),
			((): void => {}),
			class {},
			new Map(),
		];

		const VALUES_RIGHT: Array<unknown> = [
			Symbol(),
			((): void => {}),
			class {},
			new Map(),
		];

		for (let i: number = 0; i < VALUES_LEFT.length; ++i)
		{
			const RESULT: unknown = Helper.isSimilar(VALUES_LEFT[i], VALUES_RIGHT[i]);

			strictEqual(RESULT, false);
		}
	});
});
