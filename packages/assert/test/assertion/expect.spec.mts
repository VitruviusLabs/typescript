import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { RootAssertion } from "../../src/assertion/root-assertion.mjs";
import { expect } from "../../src/assertion/expect.mjs";

describe("expect", (): void => {
	it("should return an initialized root assertion", (): void => {
		const SYMBOL: unique symbol = Symbol("test");

		const RESULT: unknown = expect(SYMBOL);

		deepStrictEqual(RESULT, new RootAssertion(SYMBOL));
	});
});
