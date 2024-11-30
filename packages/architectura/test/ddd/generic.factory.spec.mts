import { describe, it } from "node:test";
import { deepStrictEqual, strictEqual } from "node:assert";
import { GenericFactory } from "../../src/_index.mjs";

describe("GenericFactory", (): void => {
	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: GenericFactory<Date, typeof Date> = new GenericFactory(Date);

			strictEqual(FACTORY["classConstructor"], Date);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the object", (): void => {
			const FACTORY: GenericFactory<Date, typeof Date> = new GenericFactory(Date);

			const RESULT: Date = FACTORY.create(12345);

			deepStrictEqual(RESULT, new Date(12345));
		});
	});
});
