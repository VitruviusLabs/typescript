import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.hasNullableProperty", (): void => {
	it("should throw when given an object without the property", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.hasNullableProperty({}, "answer");
		};

		throws(WRAPPER, createErrorTest("The value must have a property \"answer\"."));
	});

	it("should return when given an object with the property", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.hasNullableProperty({ answer: undefined }, "answer");
		};

		doesNotThrow(WRAPPER);
	});
});
