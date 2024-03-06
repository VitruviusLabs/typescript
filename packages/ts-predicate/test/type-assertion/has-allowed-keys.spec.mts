import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";

describe("TypeAssertion.hasAllowedKeys", (): void => {
	it("should return when every key is allowed, even if some allowed keys are missing", (): void => {
		const WRAPPER = (): void =>
		{
			TypeAssertion.hasAllowedKeys({ alpha: 1, beta: 2 }, ["alpha", "beta", "gamma"]);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when some keys are not allowed", (): void => {
		const WRAPPER_SINGLE = (): void =>
		{
			TypeAssertion.hasAllowedKeys({ alpha: 1, beta: 2, gamma: 3 }, ["alpha", "beta"]);
		};

		const WRAPPER_MULTIPLE = (): void =>
		{
			TypeAssertion.hasAllowedKeys({ alpha: 1, beta: 2, gamma: 3, delta: 4 }, ["alpha", "beta"]);
		};

		throws(WRAPPER_SINGLE, createErrorTest('The value must not have the properties "gamma".'));
		throws(WRAPPER_MULTIPLE, createErrorTest('The value must not have the properties "gamma", "delta".'));
	});
});
