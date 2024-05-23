import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { JSONUtility } from "../../src/_index.mjs";

describe("JSONUtility", (): void => {
	describe("Serialize", (): void => {
		it("should return undefined when given undefined", (): void => {
			strictEqual(JSONUtility.Serialize(undefined), undefined);
		});

		it("should return undefined when given any symbol", (): void => {
			strictEqual(JSONUtility.Serialize(Symbol()), undefined);
			strictEqual(JSONUtility.Serialize(Symbol("description")), undefined);
			strictEqual(JSONUtility.Serialize(Symbol.iterator), undefined);
		});

		it("should convert null into a JSON null", (): void => {
			strictEqual(JSONUtility.Serialize(null), "null");
		});

		it("should convert a string into a JSON string", (): void => {
			strictEqual(JSONUtility.Serialize(""), '""');
			strictEqual(JSONUtility.Serialize("lorem ipsum"), '"lorem ipsum"');
		});

		it("should convert a boolean into a JSON boolean", (): void => {
			strictEqual(JSONUtility.Serialize(false), "false");
			strictEqual(JSONUtility.Serialize(true), "true");
		});

		it("should convert a number into a JSON number", (): void => {
			strictEqual(JSONUtility.Serialize(0), "0");
			strictEqual(JSONUtility.Serialize(1), "1");
			strictEqual(JSONUtility.Serialize(0.1), "0.1");
			strictEqual(JSONUtility.Serialize(-1), "-1");
		});

		it("should convert a bigint into a JSON pseudo-bigint", (): void => {
			strictEqual(JSONUtility.Serialize(0n), '"0n"');
			strictEqual(JSONUtility.Serialize(1n), '"1n"');
			strictEqual(JSONUtility.Serialize(-1n), '"-1n"');
		});

		it("should convert a serializable object into a JSON object", (): void => {
			const OBJECT: unknown = {
				null: null,
				boolean: true,
				number: 1,
				bigint: 1n,
				string: "lorem ipsum",
			};

			strictEqual(JSONUtility.Serialize({}), "{}");
			strictEqual(JSONUtility.Serialize(OBJECT), '{"null":null,"boolean":true,"number":1,"bigint":"1n","string":"lorem ipsum"}');
		});
	});

	describe("Deserialize", (): void => {
		it("should convert a JSON null into null", (): void => {
			strictEqual(JSONUtility.Deserialize("null"), null);
		});

		it("should convert a JSON string into a string", (): void => {
			strictEqual(JSONUtility.Deserialize('""'), "");
			strictEqual(JSONUtility.Deserialize('"lorem ipsum"'), "lorem ipsum");
		});

		it("should convert a JSON boolean into a boolean", (): void => {
			strictEqual(JSONUtility.Deserialize("false"), false);
			strictEqual(JSONUtility.Deserialize("true"), true);
		});

		it("should convert a JSON number into a number", (): void => {
			strictEqual(JSONUtility.Deserialize("0"), 0);
			strictEqual(JSONUtility.Deserialize("1"), 1);
			strictEqual(JSONUtility.Deserialize("0.1"), 0.1);
			strictEqual(JSONUtility.Deserialize("-1"), -1);
		});

		it("should convert a JSON pseudo-bigint into a bigint", (): void => {
			strictEqual(JSONUtility.Deserialize('"0n"'), 0n);
			strictEqual(JSONUtility.Deserialize('"1n"'), 1n);
			strictEqual(JSONUtility.Deserialize('"-1n"'), -1n);
		});

		it("should convert a JSON object into an object", (): void => {
			const OBJECT: unknown = {
				null: null,
				boolean: true,
				number: 1,
				bigint: 1n,
				string: "lorem ipsum",
			};

			deepStrictEqual(JSONUtility.Deserialize("{}"), {});
			deepStrictEqual(JSONUtility.Deserialize('{"null":null,"boolean":true,"number":1,"bigint":"1n","string":"lorem ipsum"}'), OBJECT);
		});
	});
});
