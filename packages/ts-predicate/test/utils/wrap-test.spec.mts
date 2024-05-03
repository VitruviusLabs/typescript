import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion, TypeGuard } from "../../src/_index.mjs";

describe("wrapTest", (): void => {
	it("should create a proper test closure of any test function", (): void => {
		function dummy(value: unknown, check: string): value is string
		{
			return value === check;
		}

		const wrapped_assert: ((value: unknown) => value is string) = TypeAssertion.wrapTest(dummy, "lorem");
		const wrapped_guard: ((value: unknown) => value is string) = TypeGuard.wrapTest(dummy, "lorem");

		deepStrictEqual(wrapped_assert("lorem"), true);
		deepStrictEqual(wrapped_guard("ipsum"), false);
	});
});
