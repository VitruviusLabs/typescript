import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyFactory, DummyModel } from "../../mock/_index.mjs";

describe("BaseFactory", (): void => {
	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);

			strictEqual(FACTORY["modelConstructor"], DummyModel);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);

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
