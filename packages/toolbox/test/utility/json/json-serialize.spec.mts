import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { jsonSerialize } from "../../../src/_index.mjs";

describe("jsonSerialize", (): void => {
	it("should return undefined when given undefined", (): void => {
		strictEqual(jsonSerialize(undefined), undefined);
	});

	it("should return undefined when given any symbol", (): void => {
		strictEqual(jsonSerialize(Symbol()), undefined);
		strictEqual(jsonSerialize(Symbol("description")), undefined);
		strictEqual(jsonSerialize(Symbol.iterator), undefined);
	});

	it("should convert null into a JSON null", (): void => {
		strictEqual(jsonSerialize(null), "null");
	});

	it("should convert a string into a JSON string", (): void => {
		strictEqual(jsonSerialize(""), '""');
		strictEqual(jsonSerialize("lorem ipsum"), '"lorem ipsum"');
	});

	it("should convert a boolean into a JSON boolean", (): void => {
		strictEqual(jsonSerialize(false), "false");
		strictEqual(jsonSerialize(true), "true");
	});

	it("should convert a number into a JSON number", (): void => {
		strictEqual(jsonSerialize(0), "0");
		strictEqual(jsonSerialize(1), "1");
		strictEqual(jsonSerialize(0.1), "0.1");
		strictEqual(jsonSerialize(-1), "-1");
	});

	it("should convert a bigint into a JSON pseudo-bigint", (): void => {
		strictEqual(jsonSerialize(0n), '"0n"');
		strictEqual(jsonSerialize(1n), '"1n"');
		strictEqual(jsonSerialize(-1n), '"-1n"');
	});

	it("should convert a serializable object into a JSON object", (): void => {
		const OBJECT: unknown = {
			null: null,
			boolean: true,
			number: 1,
			bigint: 1n,
			string: "lorem ipsum",
		};

		strictEqual(jsonSerialize({}), "{}");
		strictEqual(jsonSerialize(OBJECT), '{"null":null,"boolean":true,"number":1,"bigint":"1n","string":"lorem ipsum"}');
	});
});
