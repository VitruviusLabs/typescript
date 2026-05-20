import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { ValidationError, assertAllowedKeys } from "../../src/_index.mjs";

describe("assertAllowedKeys", (): void => {
	it("should return when every key is allowed, even if some allowed keys are missing", (): void => {
		const WRAPPER = (): void =>
		{
			assertAllowedKeys({ alpha: 1, beta: 2 }, ["alpha", "beta", "gamma"]);
		};

		doesNotThrow(WRAPPER);
	});

	it("should throw when some keys are not allowed", (): void => {
		const WRAPPER_SINGLE = (): void =>
		{
			assertAllowedKeys({ alpha: 1, beta: 2, gamma: 3 }, ["alpha", "beta"]);
		};

		const WRAPPER_MULTIPLE = (): void =>
		{
			assertAllowedKeys({ alpha: 1, beta: 2, gamma: 3, delta: 4 }, ["alpha", "beta"]);
		};

		throws(WRAPPER_SINGLE, createErrorTest(new ValidationError('The value must not have the properties "gamma".')));
		throws(WRAPPER_MULTIPLE, createErrorTest(new ValidationError('The value must not have the properties "gamma", "delta".')));
	});
});
