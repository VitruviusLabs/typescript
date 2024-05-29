import { describe, it } from "node:test";
import { strictEqual, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { BaseModel } from "../../src/_index.mjs";

describe("BaseModel", (): void => {
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

	describe("constructor", (): void => {
		it("should create a new model", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			strictEqual(Reflect.get(MODEL, "id"), undefined);
			strictEqual(Reflect.get(MODEL, "uuid"), "00000000-0000-0000-0000-000000000000");
			strictEqual(Reflect.get(MODEL, "createdAt"), undefined);
			strictEqual(Reflect.get(MODEL, "updatedAt"), undefined);
			strictEqual(Reflect.get(MODEL, "deletedAt"), undefined);
		});
	});

	describe("hasId", (): void => {
		it("should return false if the model has no id", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			strictEqual(MODEL.hasId(), false);
		});

		it("should return true if the model has an id", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			Reflect.set(MODEL, "id", 1n);

			strictEqual(MODEL.hasId(), true);
		});
	});

	describe("getId", (): void => {
		it("should throw an error if the model has no id", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const WRAPPER = (): void => {
				MODEL.getId();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the id if the model has an id", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			Reflect.set(MODEL, "id", 1n);

			strictEqual(MODEL.getId(), 1n);
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			strictEqual(MODEL.getUUID(), "00000000-0000-0000-0000-000000000000");
		});
	});

	describe("getCreatedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const WRAPPER = (): void => {
				MODEL.getCreatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the creation date if the model has a creation date", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const DATE: Date = new Date();

			Reflect.set(MODEL, "id", 1n);
			Reflect.set(MODEL, "createdAt", DATE);

			strictEqual(MODEL.getCreatedAt(), DATE);
		});
	});

	describe("getUpdatedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const WRAPPER = (): void => {
				MODEL.getUpdatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the update date if the model has an update date", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const DATE: Date = new Date();

			Reflect.set(MODEL, "id", 1n);
			Reflect.set(MODEL, "updatedAt", DATE);

			strictEqual(MODEL.getUpdatedAt(), DATE);
		});
	});

	describe("getDeletedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const WRAPPER = (): void => {
				MODEL.getUpdatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return undefined if the model has no deletion date", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			Reflect.set(MODEL, "id", 1n);

			strictEqual(MODEL.getDeletedAt(), undefined);
		});

		it("should return the deletion date if the model has a deletion date", (): void => {
			const MODEL: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const DATE: Date = new Date();

			Reflect.set(MODEL, "id", 1n);
			Reflect.set(MODEL, "deletedAt", DATE);

			strictEqual(MODEL.getDeletedAt(), DATE);
		});
	});
});
