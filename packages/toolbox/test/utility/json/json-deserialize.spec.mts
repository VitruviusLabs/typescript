import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { jsonDeserialize } from "../../../src/_index.mjs";

describe("jsonDeserialize", (): void => {
	it("should convert a JSON null into null", (): void => {
		strictEqual(jsonDeserialize("null"), null);
	});

	it("should convert a JSON string into a string", (): void => {
		strictEqual(jsonDeserialize('""'), "");
		strictEqual(jsonDeserialize('"lorem ipsum"'), "lorem ipsum");
	});

	it("should convert a JSON boolean into a boolean", (): void => {
		strictEqual(jsonDeserialize("false"), false);
		strictEqual(jsonDeserialize("true"), true);
	});

	it("should convert a JSON number into a number", (): void => {
		strictEqual(jsonDeserialize("0"), 0);
		strictEqual(jsonDeserialize("1"), 1);
		strictEqual(jsonDeserialize("0.1"), 0.1);
		strictEqual(jsonDeserialize("-1"), -1);
	});

	it("should convert a JSON pseudo-bigint into a bigint", (): void => {
		strictEqual(jsonDeserialize('"0n"'), 0n);
		strictEqual(jsonDeserialize('"1n"'), 1n);
		strictEqual(jsonDeserialize('"-1n"'), -1n);
	});

	it("should convert a JSON object into an object", (): void => {
		const OBJECT: unknown = {
			null: null,
			boolean: true,
			number: 1,
			bigint: 1n,
			string: "lorem ipsum",
		};

		deepStrictEqual(jsonDeserialize("{}"), {});
		deepStrictEqual(jsonDeserialize('{"null":null,"boolean":true,"number":1,"bigint":"1n","string":"lorem ipsum"}'), OBJECT);
	});
});
