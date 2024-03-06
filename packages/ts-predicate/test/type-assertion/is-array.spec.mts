import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion, ValidationError } from "../../src/_index.mjs";
import { GroupType, createErrorTest, getInvertedValues, getValues } from "@vitruvius-labs/testing-ground";

function isNumberTest(value: unknown): value is number
{
	return Number.isSafeInteger(value);
}

describe("TypeAssertion.isArray", (): void => {
	it("should return when given an array", (): void => {
		const VALUES: Array<unknown> = getValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.isArray(ITEM);
			};

			doesNotThrow(WRAPPER);
		}
	});

	it("should throw when given anything else", (): void => {
		const VALUES: Array<unknown> = getInvertedValues(GroupType.ARRAY);

		for (const ITEM of VALUES)
		{
			const WRAPPER = (): void =>
			{
				TypeAssertion.isArray(ITEM);
			};

			throws(WRAPPER, createErrorTest("The value is not an array."));
		}
	});

	it("should ignore empty constraints", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.isArray([1, "2", true], {});
		};

		doesNotThrow(WRAPPER);
	});

	it("should return when given an array with a length greater or equal to the minLength constraint", (): void => {
		const WRAPPER_GREATER_LENGTH = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3], { minLength: 2 });
		};

		const WRAPPER_EXACT_LENGTH = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3], { minLength: 3 });
		};

		doesNotThrow(WRAPPER_GREATER_LENGTH);
		doesNotThrow(WRAPPER_EXACT_LENGTH);
	});

	it("should throw when given a minLength constraint less than 1", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.isArray([], { minLength: 0 });
		};

		throws(WRAPPER, createErrorTest(new RangeError(
			"The minimum length cannot be less than one."
		)));
	});

	it("should throw when given an array with a length below the minLength constraint", (): void => {
		const WRAPPER_EMPTY = (): void =>
		{
			TypeAssertion.isArray([], { minLength: 1 });
		};

		const WRAPPER_SMALL_LENGTH = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3], { minLength: 4 });
		};

		throws(WRAPPER_EMPTY, createErrorTest(new ValidationError(
			"The value is an array, but its content is incorrect.",
			[new ValidationError("It must not be empty.")]
		)));

		throws(WRAPPER_SMALL_LENGTH, createErrorTest(new ValidationError(
			"The value is an array, but its content is incorrect.",
			[new ValidationError("It must have at least 4 items.")]
		)));
	});

	it("should return when given an array with all the values passing the itemTest constraint", (): void => {
		const WRAPPER_EMPTY = (): void =>
		{
			TypeAssertion.isArray([], { itemTest: isNumberTest });
		};

		const WRAPPER_VALID = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3], { itemTest: isNumberTest });
		};

		doesNotThrow(WRAPPER_EMPTY);
		doesNotThrow(WRAPPER_VALID);
	});

	it("should throw when given an array with some values not passing the itemTest constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3, Symbol("anomaly")], { itemTest: isNumberTest });
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an array, but its content is incorrect.",
			[
				new ValidationError(
					"The value at index 3 is incorrect.",
					[new ValidationError("There is no information on why the value is incorrect.")]
				),
			]
		)));
	});

	it("should return when given an array with all the values passing the test constraint", (): void => {
		const WRAPPER_EMPTY = (): void =>
		{
			TypeAssertion.isArray([], isNumberTest);
		};

		const WRAPPER_VALID = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3], isNumberTest);
		};

		doesNotThrow(WRAPPER_EMPTY);
		doesNotThrow(WRAPPER_VALID);
	});

	it("should throw when given an array with some values not passing the test constraint", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.isArray([1, 2, 3, Symbol("anomaly")], isNumberTest);
		};

		throws(WRAPPER, createErrorTest(new ValidationError(
			"The value is an array, but its content is incorrect.",
			[
				new ValidationError(
					"The value at index 3 is incorrect.",
					[new ValidationError("There is no information on why the value is incorrect.")]
				),
			]
		)));
	});
});
