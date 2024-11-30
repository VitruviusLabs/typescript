import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { type ModelMetadataInterface, ModelRepositoryStatusEnum } from "../../src/_index.mjs";
import { DummyBaseRepository, type DummyDelegateDataInterface, DummyModel, DummySimpleFactory, getDummy } from "../../mock/_index.mjs";
import { getDefaultDummyDelegateDataInterface } from "../../mock/ddd/get-default-dummy-delegate-data.mjs";

describe("BaseRepository", (): void => {
	// @ts-expect-error: Stub protected method
	const FETCH_UUID_STUB: SinonStub = stub(DummyBaseRepository.prototype, "fetchByUUID");
	// @ts-expect-error: Stub protected method
	const FETCH_ID_STUB: SinonStub = stub(DummyBaseRepository.prototype, "fetchById");
	// @ts-expect-error: Stub protected method
	const REGISTER_STUB: SinonStub = stub(DummyBaseRepository.prototype, "register");
	// @ts-expect-error: Stub protected method
	const UPDATE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "update");
	// @ts-expect-error: Stub protected method
	const RESTORE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "restore");
	// @ts-expect-error: Stub protected method
	const DELETE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "delete");
	// @ts-expect-error: Stub protected method
	const DESTROY_STUB: SinonStub = stub(DummyBaseRepository.prototype, "destroy");

	beforeEach((): void => {
		FETCH_UUID_STUB.reset();
		FETCH_UUID_STUB.rejects();
		FETCH_ID_STUB.reset();
		FETCH_ID_STUB.rejects();
		REGISTER_STUB.reset();
		REGISTER_STUB.rejects();
		UPDATE_STUB.reset();
		UPDATE_STUB.rejects();
		RESTORE_STUB.reset();
		RESTORE_STUB.rejects();
		DELETE_STUB.reset();
		DELETE_STUB.rejects();
		DESTROY_STUB.reset();
		DESTROY_STUB.rejects();
	});

	after((): void => {
		FETCH_UUID_STUB.restore();
		FETCH_ID_STUB.restore();
		REGISTER_STUB.restore();
		UPDATE_STUB.restore();
		RESTORE_STUB.restore();
		DELETE_STUB.restore();
		DESTROY_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new repository", (): void => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			strictEqual(REPOSITORY["factory"], FACTORY);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model then set the metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			const RESULT: unknown = REPOSITORY["create"](DATA);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findByUUID", (): void => {
		it("should return undefined if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});

		it("should return undefined if the entity with this id was soft deleted", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, undefined);
		});

		it("should return a soft deleted instance with this UUID exists when the option 'includeDeleted' is true", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000", { includeDeleted: true });

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getByUUID", (): void => {
		it("should throw if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000"), createErrorTest());
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});

		it("should throw if the entity with this UUID was soft deleted", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);

			FETCH_UUID_STUB.resolves(DATA);

			await rejects(REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000"), createErrorTest());
		});

		it("should return a soft deleted instance with this UUID exists when the option 'includeDeleted' is true", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000", { includeDeleted: true });

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findById", (): void => {
		it("should return undefined if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});

		it("should return undefined if the entity with this id was soft deleted", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, undefined);
		});

		it("should return a soft deleted instance with this id exists when the option 'includeDeleted' is true", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(1n, { includeDeleted: true });

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getById", (): void => {
		it("should throw if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});

		it("should throw if the entity with this id was soft deleted", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);

			FETCH_ID_STUB.resolves(DATA);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should return a soft deleted instance with this id exists when the option 'includeDeleted' is true", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getById(1n, { includeDeleted: true });

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("saveModel", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.NEW });

			REGISTER_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.saveModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(REGISTER_STUB.callCount, 1, "The 'register' method should be called exactly once");
			deepStrictEqual(REGISTER_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should update a saved entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			UPDATE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.saveModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should be called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to save a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			await rejects(REPOSITORY.saveModel(ENTITY), createErrorTest());
		});

		it("should throw when trying to save a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.saveModel(ENTITY), createErrorTest());
		});
	});

	describe("deleteModel", (): void => {
		it("should throw when trying to soft delete a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.deleteModel(ENTITY), createErrorTest());
		});

		it("should soft delete a saved entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			DELETE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.deleteModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DELETE_STUB.callCount, 1, "The 'delete' method should be called exactly once");
			deepStrictEqual(DELETE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to soft delete a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			await rejects(REPOSITORY.deleteModel(ENTITY), createErrorTest());
		});

		it("should throw when trying to soft delete a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.deleteModel(ENTITY), createErrorTest());
		});
	});

	describe("restoreModel", (): void => {
		it("should throw when trying to restore a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.restoreModel(ENTITY), createErrorTest());
		});

		it("should throw when trying to restore a saved entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			await rejects(REPOSITORY.restoreModel(ENTITY), createErrorTest());
		});

		it("should restore a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			RESTORE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.restoreModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(RESTORE_STUB.callCount, 1, "The 'restore' method should be called exactly once");
			deepStrictEqual(RESTORE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to restore a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.restoreModel(ENTITY), createErrorTest());
		});
	});

	describe("destroyModel", (): void => {
		it("should throw when trying to destroy a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.destroyModel(ENTITY), createErrorTest());
		});

		it("should hard destroy a saved entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			DESTROY_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.destroyModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should be called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should hard destroy a soft deleted entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });
			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DELETED });

			DESTROY_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.destroyModel(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should be called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to destroy a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.destroyModel(ENTITY), createErrorTest());
		});
	});
});
