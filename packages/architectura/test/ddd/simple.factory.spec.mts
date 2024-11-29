import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyModel, DummySimpleFactory } from "../../mock/_index.mjs";
import { BaseFactory, SimpleFactory } from "../../src/_index.mjs";

describe("SimpleFactory", (): void => {
	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);

			// @ts-expect-error: BaseFactory is an abstract class
			instanceOf(SimpleFactory.prototype, BaseFactory);
			strictEqual(FACTORY["modelConstructor"], DummyModel);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model", (): void => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);

			const RESULT: DummyModel = FACTORY.create({
				uuid: "00000000-0000-0000-0000-000000000000",
				value: 0,
			});

			instanceOf(RESULT, DummyModel);
			strictEqual(RESULT["id"], undefined);
			strictEqual(RESULT["uuid"], "00000000-0000-0000-0000-000000000000");
			strictEqual(RESULT["createdAt"], undefined);
			strictEqual(RESULT["updatedAt"], undefined);
			strictEqual(RESULT["deletedAt"], undefined);
			strictEqual(RESULT["value"], 0);
		});
	});
});
