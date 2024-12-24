import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { TypeAssertion, TypeGuard } from "../../src/_index.mjs";

describe("unary", (): void => {
	it("should create a proper test closure of any test function", (): void => {
		function dummy(value: unknown, check: string): value is string
		{
			return value === check;
		}

		const WRAPPED_ASSERT: ((value: unknown) => value is string) = TypeAssertion.unary(dummy, "lorem");
		const WRAPPED_GUARD: ((value: unknown) => value is string) = TypeGuard.unary(dummy, "lorem");

		deepStrictEqual(WRAPPED_ASSERT("lorem"), true);
		deepStrictEqual(WRAPPED_GUARD("ipsum"), false);
	});
});
