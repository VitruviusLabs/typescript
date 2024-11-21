import { describe, it } from "node:test";
import { match, strictEqual, throws } from "node:assert";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { DummyModel } from "../../mock/ddd/dummy.model.mjs";
import { getDummy } from "../../mock/_index.mjs";

describe("BaseModel", (): void => {
	describe("constructor", (): void => {
		it("should create a new model", (): void => {
			const ENTITY: DummyModel = new DummyModel({
				uuid: "00000000-0000-0000-0000-000000000000",
				value: 0,
			});

			strictEqual(ENTITY["id"], undefined);
			strictEqual(ENTITY["uuid"], "00000000-0000-0000-0000-000000000000");
			strictEqual(ENTITY["createdAt"], undefined);
			strictEqual(ENTITY["updatedAt"], undefined);
			strictEqual(ENTITY["deletedAt"], undefined);
			strictEqual(ENTITY["value"], 0);
		});

		it("should create a new model with a random UUID by default", (): void => {
			const ENTITY: DummyModel = new DummyModel({
				value: 0,
			});

			match(ENTITY["uuid"], /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
		});
	});

	describe("hasId", (): void => {
		it("should return false if the model has no id", (): void => {
			const ENTITY: DummyModel = getDummy();

			strictEqual(ENTITY.hasId(), false);
		});

		it("should return true if the model has an id", (): void => {
			const ENTITY: DummyModel = getDummy(new Date());

			strictEqual(ENTITY.hasId(), true);
		});
	});

	describe("getId", (): void => {
		it("should throw an error if the model has no id", (): void => {
			const ENTITY: DummyModel = getDummy();

			const WRAPPER = (): void => {
				ENTITY.getId();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the id if the model has an id", (): void => {
			const ENTITY: DummyModel = getDummy(new Date());

			strictEqual(ENTITY.getId(), 0n);
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const ENTITY: DummyModel = getDummy();

			strictEqual(ENTITY.getUUID(), "00000000-0000-0000-0000-000000000000");
		});
	});

	describe("getCreatedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const ENTITY: DummyModel = getDummy();

			const WRAPPER = (): void => {
				ENTITY.getCreatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the creation date if the model has a creation date", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy(DATE);

			strictEqual(ENTITY.getCreatedAt(), DATE);
		});
	});

	describe("getUpdatedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const ENTITY: DummyModel = getDummy();

			const WRAPPER = (): void => {
				ENTITY.getUpdatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the update date if the model has an update date", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy(DATE);

			strictEqual(ENTITY.getUpdatedAt(), DATE);
		});
	});

	describe("getDeletedAt", (): void => {
		it("should throw an error if the model was never saved", (): void => {
			const ENTITY: DummyModel = getDummy();

			const WRAPPER = (): void => {
				ENTITY.getDeletedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return undefined if the model has no deletion date", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy(DATE);

			strictEqual(ENTITY.getDeletedAt(), undefined);
		});

		it("should return the deletion date if the model has a deletion date", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy(DATE, DATE);

			strictEqual(ENTITY.getDeletedAt(), DATE);
		});
	});
});
