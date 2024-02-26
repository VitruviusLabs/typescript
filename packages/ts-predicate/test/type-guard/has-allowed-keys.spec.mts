import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeGuard } from "../../src/index.mjs";

describe("TypeGuard.hasAllowedKeys", (): void => {
	it("should return true when testing an empty object against an empty array of allowed keys", (): void => {
		const RESULT: unknown = TypeGuard.hasAllowedKeys({}, []);

		strictEqual(RESULT, true);
	});

	it("should return true when every key is allowed, even if some allowed keys are missing", (): void => {
		const RESULT: unknown = TypeGuard.hasAllowedKeys(
			{ alpha: 1, beta: 2 },
			["alpha", "beta", "gamma"]
		);

		strictEqual(RESULT, true);
	});

	it("should return false when some keys are not allowed", (): void => {
		const RESULT: unknown = TypeGuard.hasAllowedKeys(
			{ alpha: 1, beta: 2, gamma: 3 },
			["alpha", "beta"]
		);

		strictEqual(RESULT, false);
	});
});
