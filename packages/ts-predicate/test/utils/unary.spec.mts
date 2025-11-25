import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { unary } from "../../src/_index.mjs";

describe("unary", (): void => {
	it("should create a proper test closure of any test function", (): void => {
		function dummy(value: unknown, check: string): value is string
		{
			return value === check;
		}

		const PARTIAL_APPLICATION: ((value: unknown) => value is string) = unary(dummy, "lorem");

		deepStrictEqual(PARTIAL_APPLICATION("lorem"), true);
		deepStrictEqual(PARTIAL_APPLICATION("ipsum"), false);
	});
});
