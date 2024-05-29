import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { BaseFactory, BaseModel, type BaseModelInstantiationInterface } from "../../src/_index.mjs";

describe("BaseFactory", (): void => {
	class DummyModel extends BaseModel
	{
		public async save(): Promise<void>
		{
			return await Promise.resolve();
		}

		public async delete(): Promise<void>
		{
			return await Promise.resolve();
		}
	}

	class DummyFactory extends BaseFactory<DummyModel, BaseModelInstantiationInterface, typeof DummyModel>
	{
	}

	describe("constructor", (): void => {
		it("should create a new factory", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);

			strictEqual(Reflect.get(FACTORY, "classConstructor"), DummyModel);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const MODEL: DummyModel = FACTORY.create({ uuid: "lorem-ipsum" });

			strictEqual(Reflect.get(MODEL, "id"), undefined);
			strictEqual(Reflect.get(MODEL, "uuid"), "lorem-ipsum");
			strictEqual(Reflect.get(MODEL, "createdAt"), undefined);
			strictEqual(Reflect.get(MODEL, "updatedAt"), undefined);
			strictEqual(Reflect.get(MODEL, "deletedAt"), undefined);
		});
	});
});
