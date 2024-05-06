import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.assertProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertProperty({}, "answer");
		};

		throws(WRAPPER, createErrorTest("The value must have a property \"answer\"."));
	});

	it("should throw when given an object with the property, but the value is nullish", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertProperty({ answer: undefined }, "answer");
		};

		throws(WRAPPER, createErrorTest("The property \"answer\" must not have a nullish value (undefined, null, or NaN)."));
	});

	it("should return when given an object with the property and the value is not nullish", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.assertProperty({ answer: 42 }, "answer");
		};

		doesNotThrow(WRAPPER);
	});
});
