import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { Helper } from "../../src/_index.mjs";

describe("Helper.keys", (): void => {
	it("should return the keys of the given object", (): void => {
		const VALUE: { a: 0; b: 0 } = { a: 0, b: 0 };

		const KEYS: Array<"a" | "b"> = Helper.keys(VALUE);

		deepStrictEqual(KEYS, ["a", "b"]);
	});

	it("should return the keys of the given instance", (): void => {
		class Foo
		{
			public a: number = 0;
			public b: number = 0;
		}

		const VALUE: Foo = new Foo();

		const KEYS: Array<keyof Foo> = Helper.keys(VALUE);

		deepStrictEqual(KEYS, ["a", "b"]);
	});
});
