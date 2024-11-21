import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyModel } from "../../mock/_index.mjs";
import { SimpleFactory } from "../../src/ddd/simple.factory.mjs";

describe("SimpleFactory", (): void => {
	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: SimpleFactory<DummyModel, typeof DummyModel> = new SimpleFactory(DummyModel);

			instanceOf(FACTORY, SimpleFactory);
			strictEqual(FACTORY["classConstructor"], DummyModel);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model", (): void => {
			const FACTORY: SimpleFactory<DummyModel, typeof DummyModel> = new SimpleFactory(DummyModel);

			const ENTITY: DummyModel = FACTORY.create({
				uuid: "00000000-0000-0000-0000-000000000000",
				value: 0,
			});

			instanceOf(ENTITY, DummyModel);
			strictEqual(ENTITY["id"], undefined);
			strictEqual(ENTITY["uuid"], "00000000-0000-0000-0000-000000000000");
			strictEqual(ENTITY["createdAt"], undefined);
			strictEqual(ENTITY["updatedAt"], undefined);
			strictEqual(ENTITY["deletedAt"], undefined);
			strictEqual(ENTITY["value"], 0);
		});
	});
});
