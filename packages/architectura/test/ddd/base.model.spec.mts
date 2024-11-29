import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, match, strictEqual, throws } from "node:assert";
import { type SinonStub, type SinonStubbedInstance, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { DummyModel } from "../../mock/ddd/dummy.model.mjs";
import { type DummyDelegatedRepository, getDummy } from "../../mock/_index.mjs";
import { ModelRepositoryStatusEnum } from "../../src/_index.mjs";

describe("BaseModel", (): void => {
	// @ts-expect-error: Stubbing a protected method for testing purposes
	const GET_REPOSITORY_STUB: SinonStub = stub(DummyModel.prototype, "getSelfRepository");

	const STUBBED_REPOSITORY: SinonStubbedInstance<Pick<DummyDelegatedRepository, "saveModel" | "restoreModel" | "deleteModel" | "destroyModel" >> = {
		saveModel: stub(),
		restoreModel: stub(),
		deleteModel: stub(),
		destroyModel: stub(),
	};

	beforeEach((): void => {
		GET_REPOSITORY_STUB.reset();
		GET_REPOSITORY_STUB.returns(STUBBED_REPOSITORY);
		STUBBED_REPOSITORY.saveModel.reset();
		STUBBED_REPOSITORY.saveModel.resolves();
		STUBBED_REPOSITORY.restoreModel.reset();
		STUBBED_REPOSITORY.restoreModel.resolves();
		STUBBED_REPOSITORY.deleteModel.reset();
		STUBBED_REPOSITORY.deleteModel.resolves();
		STUBBED_REPOSITORY.destroyModel.reset();
		STUBBED_REPOSITORY.destroyModel.resolves();
	});

	after((): void => {
		GET_REPOSITORY_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new model", (): void => {
			const ENTITY: DummyModel = new DummyModel({
				uuid: "00000000-0000-0000-0000-000000000000",
				value: 0,
			});

			strictEqual(ENTITY["uuid"], "00000000-0000-0000-0000-000000000000");
			strictEqual(ENTITY["repositoryStatus"], ModelRepositoryStatusEnum.NEW);
			strictEqual(ENTITY["id"], undefined);
			strictEqual(ENTITY["createdAt"], undefined);
			strictEqual(ENTITY["updatedAt"], undefined);
			strictEqual(ENTITY["deletedAt"], undefined);
		});

		it("should create a new model with a random UUID by default", (): void => {
			const ENTITY: DummyModel = new DummyModel({
				value: 0,
			});

			match(ENTITY["uuid"], /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
		});
	});

	describe("getUUID", (): void => {
		it("should return the UUID", (): void => {
			const ENTITY: DummyModel = getDummy();

			strictEqual(ENTITY.getUUID(), "00000000-0000-0000-0000-000000000000");
		});
	});

	describe("hasId", (): void => {
		it("should return false if the model is new", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, id: undefined });

			strictEqual(ENTITY.hasId(), false);
		});

		it("should return true if the model was saved", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED, id: 1n });

			strictEqual(ENTITY.hasId(), true);
		});

		it("should return true if the model was soft deleted", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED, id: 1n });

			strictEqual(ENTITY.hasId(), true);
		});

		it("should return false if the model was destroyed", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED, id: undefined });

			strictEqual(ENTITY.hasId(), false);
		});
	});

	describe("getId", (): void => {
		it("should throw an error if the model is new", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, id: undefined });

			const WRAPPER = (): void => {
				ENTITY.getId();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the id if the model was saved", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED, id: 1n });

			strictEqual(ENTITY.getId(), 1n);
		});

		it("should return the id if the model was soft deleted", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED, id: 1n });

			strictEqual(ENTITY.getId(), 1n);
		});

		it("should throw an error if the model was destroyed", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED, id: undefined });

			const WRAPPER = (): void => {
				ENTITY.getId();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("getCreatedAt", (): void => {
		it("should throw an error if the model is new", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, createdAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getCreatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the creation date if the model was saved", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED, createdAt: DATE });

			strictEqual(ENTITY.getCreatedAt(), DATE);
		});

		it("should return the creation date if the model was soft deleted", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED, createdAt: DATE });

			strictEqual(ENTITY.getCreatedAt(), DATE);
		});

		it("should throw an error if the model was destroyed", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, createdAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getCreatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("getUpdatedAt", (): void => {
		it("should throw an error if the model is new", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, updatedAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getUpdatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return the update date if the model was saved", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED, updatedAt: DATE });

			strictEqual(ENTITY.getUpdatedAt(), DATE);
		});

		it("should return the update date if the model was soft deleted", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED, updatedAt: DATE });

			strictEqual(ENTITY.getUpdatedAt(), DATE);
		});

		it("should throw an error if the model was destroyed", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED, updatedAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getUpdatedAt();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("getDeletedAt", (): void => {
		it("should throw an error if the model is new", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW, deletedAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getDeletedAt();
			};

			throws(WRAPPER, createErrorTest());
		});

		it("should return undefined if the model was saved", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED, deletedAt: undefined });

			strictEqual(ENTITY.getDeletedAt(), undefined);
		});

		it("should return the deletion date if the model was soft deleted", (): void => {
			const DATE: Date = new Date();

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED, deletedAt: DATE });

			strictEqual(ENTITY.getDeletedAt(), DATE);
		});

		it("should throw an error if the model was destroyed", (): void => {
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED, deletedAt: undefined });

			const WRAPPER = (): void => {
				ENTITY.getDeletedAt();
			};

			throws(WRAPPER, createErrorTest());
		});
	});

	describe("save", (): void => {
		it("should save the model", async (): Promise<void> => {
			const ENTITY: DummyModel = getDummy();

			await ENTITY.save();

			strictEqual(GET_REPOSITORY_STUB.callCount, 1, "The method 'getSelfRepository' must be called once");
			strictEqual(STUBBED_REPOSITORY.saveModel.callCount, 1, "The repository method 'save' must be called once");
			deepStrictEqual(STUBBED_REPOSITORY.saveModel.firstCall.args, [ENTITY]);
		});
	});

	describe("restore", (): void => {
		it("should restore the model", async (): Promise<void> => {
			const ENTITY: DummyModel = getDummy();

			await ENTITY.restore();

			strictEqual(GET_REPOSITORY_STUB.callCount, 1, "The method 'getSelfRepository' must be called once");
			strictEqual(STUBBED_REPOSITORY.restoreModel.callCount, 1, "The repository method 'restore' must be called once");
			deepStrictEqual(STUBBED_REPOSITORY.restoreModel.firstCall.args, [ENTITY]);
		});
	});

	describe("delete", (): void => {
		it("should delete the model", async (): Promise<void> => {
			const ENTITY: DummyModel = getDummy();

			await ENTITY.delete();

			strictEqual(GET_REPOSITORY_STUB.callCount, 1, "The method 'getSelfRepository' must be called once");
			strictEqual(STUBBED_REPOSITORY.deleteModel.callCount, 1, "The repository method 'delete' must be called once");
			deepStrictEqual(STUBBED_REPOSITORY.deleteModel.firstCall.args, [ENTITY]);
		});
	});

	describe("destroy", (): void => {
		it("should destroy the model", async (): Promise<void> => {
			const ENTITY: DummyModel = getDummy();

			await ENTITY.destroy();

			strictEqual(GET_REPOSITORY_STUB.callCount, 1, "The method 'getSelfRepository' must be called once");
			strictEqual(STUBBED_REPOSITORY.destroyModel.callCount, 1, "The repository method 'destroy' must be called once");
			deepStrictEqual(STUBBED_REPOSITORY.destroyModel.firstCall.args, [ENTITY]);
		});
	});
});
