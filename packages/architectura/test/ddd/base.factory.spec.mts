import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyModel, DummyTransformFactory } from "../../mock/_index.mjs";

describe("BaseFactory", (): void => {
	describe("create", (): void => {
		it("should return a new instance of the model", async (): Promise<void> => {
			const FACTORY: DummyTransformFactory = new DummyTransformFactory();

			const RESULT: DummyModel = await FACTORY.create({
				uuid: "00000000-0000-0000-0000-000000000000",
				value: "0",
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
