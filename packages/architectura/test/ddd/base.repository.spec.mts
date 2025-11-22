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
	// @ts-expect-error: Stub protected method
	const ON_PRE_REGISTER_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPreRegister");
	// @ts-expect-error: Stub protected method
	const ON_POST_REGISTER_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPostRegister");
	// @ts-expect-error: Stub protected method
	const ON_PRE_UPDATE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPreUpdate");
	// @ts-expect-error: Stub protected method
	const ON_POST_UPDATE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPostUpdate");
	// @ts-expect-error: Stub protected method
	const ON_PRE_RESTORE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPreRestore");
	// @ts-expect-error: Stub protected method
	const ON_POST_RESTORE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPostRestore");
	// @ts-expect-error: Stub protected method
	const ON_PRE_DELETE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPreDelete");
	// @ts-expect-error: Stub protected method
	const ON_POST_DELETE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPostDelete");
	// @ts-expect-error: Stub protected method
	const ON_PRE_DESTROY_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPreDestroy");
	// @ts-expect-error: Stub protected method
	const ON_POST_DESTROY_STUB: SinonStub = stub(DummyBaseRepository.prototype, "onPostDestroy");

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
		ON_PRE_REGISTER_STUB.reset();
		ON_PRE_REGISTER_STUB.resolves();
		ON_POST_REGISTER_STUB.reset();
		ON_POST_REGISTER_STUB.resolves();
		ON_PRE_UPDATE_STUB.reset();
		ON_PRE_UPDATE_STUB.resolves();
		ON_POST_UPDATE_STUB.reset();
		ON_POST_UPDATE_STUB.resolves();
		ON_PRE_RESTORE_STUB.reset();
		ON_PRE_RESTORE_STUB.resolves();
		ON_POST_RESTORE_STUB.reset();
		ON_POST_RESTORE_STUB.resolves();
		ON_PRE_DELETE_STUB.reset();
		ON_PRE_DELETE_STUB.resolves();
		ON_POST_DELETE_STUB.reset();
		ON_POST_DELETE_STUB.resolves();
		ON_PRE_DESTROY_STUB.reset();
		ON_PRE_DESTROY_STUB.resolves();
		ON_POST_DESTROY_STUB.reset();
		ON_POST_DESTROY_STUB.resolves();
	});

	after((): void => {
		FETCH_UUID_STUB.restore();
		FETCH_ID_STUB.restore();
		REGISTER_STUB.restore();
		UPDATE_STUB.restore();
		RESTORE_STUB.restore();
		DELETE_STUB.restore();
		DESTROY_STUB.restore();
		ON_PRE_REGISTER_STUB.restore();
		ON_POST_REGISTER_STUB.restore();
		ON_PRE_UPDATE_STUB.restore();
		ON_POST_UPDATE_STUB.restore();
		ON_PRE_RESTORE_STUB.restore();
		ON_POST_RESTORE_STUB.restore();
		ON_PRE_DELETE_STUB.restore();
		ON_POST_DELETE_STUB.restore();
		ON_PRE_DESTROY_STUB.restore();
		ON_POST_DESTROY_STUB.restore();
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
		it("should return undefined if no entity with this UUID exists (undefined return)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return undefined if no entity with this UUID exists (null returned)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(null);

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
		it("should throw if no entity with this UUID exists (undefined returned)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000"), createErrorTest());
		});

		it("should throw if no entity with this UUID exists (null returned)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_UUID_STUB.resolves(null);

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
		it("should return undefined if no entity with this id exists (undefined return)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return undefined if no entity with this id exists (null return)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(null);

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
		it("should throw if no entity with this id exists (undefined return)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should throw if no entity with this id exists (null return)", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			FETCH_ID_STUB.resolves(null);

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
			strictEqual(ON_PRE_REGISTER_STUB.callCount, 1, "The 'onPreRegister' method should be called exactly once");
			deepStrictEqual(ON_PRE_REGISTER_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_POST_REGISTER_STUB.callCount, 1, "The 'onPostRegister' method should be called exactly once");
			deepStrictEqual(ON_POST_REGISTER_STUB.firstCall.args, [ENTITY]);
			strictEqual(REGISTER_STUB.callCount, 1, "The 'register' method should be called exactly once");
			deepStrictEqual(REGISTER_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_PRE_REGISTER_STUB.firstCall.calledBefore(REGISTER_STUB.firstCall), true, "The 'onPreRegister' method should be called before the 'register' method");
			strictEqual(ON_POST_REGISTER_STUB.firstCall.calledAfter(REGISTER_STUB.firstCall), true, "The 'onPostRegister' method should be called after the 'register' method");
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
			strictEqual(ON_PRE_UPDATE_STUB.callCount, 1, "The 'onPreUpdate' method should be called exactly once");
			deepStrictEqual(ON_PRE_UPDATE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_POST_UPDATE_STUB.callCount, 1, "The 'onPostUpdate' method should be called exactly once");
			deepStrictEqual(ON_POST_UPDATE_STUB.firstCall.args, [ENTITY]);
			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should be called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_PRE_UPDATE_STUB.firstCall.calledBefore(UPDATE_STUB.firstCall), true, "The 'onPreUpdate' method should be called before the 'update' method");
			strictEqual(ON_POST_UPDATE_STUB.firstCall.calledAfter(UPDATE_STUB.firstCall), true, "The 'onPostUpdate' method should be called after the 'update' method");
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
			strictEqual(ON_PRE_DELETE_STUB.callCount, 1, "The 'onPreDelete' method should be called exactly once");
			deepStrictEqual(ON_PRE_DELETE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_POST_DELETE_STUB.callCount, 1, "The 'onPostDelete' method should be called exactly once");
			deepStrictEqual(ON_POST_DELETE_STUB.firstCall.args, [ENTITY]);
			strictEqual(DELETE_STUB.callCount, 1, "The 'delete' method should be called exactly once");
			deepStrictEqual(DELETE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_PRE_DELETE_STUB.firstCall.calledBefore(DELETE_STUB.firstCall), true, "The 'onPreDelete' method should be called before the 'delete' method");
			strictEqual(ON_POST_DELETE_STUB.firstCall.calledAfter(DELETE_STUB.firstCall), true, "The 'onPostDelete' method should be called after the 'delete' method");
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
			strictEqual(ON_PRE_RESTORE_STUB.callCount, 1, "The 'onPreRestore' method should be called exactly once");
			deepStrictEqual(ON_PRE_RESTORE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_POST_RESTORE_STUB.callCount, 1, "The 'onPostRestore' method should be called exactly once");
			deepStrictEqual(ON_POST_RESTORE_STUB.firstCall.args, [ENTITY]);
			strictEqual(RESTORE_STUB.callCount, 1, "The 'restore' method should be called exactly once");
			deepStrictEqual(RESTORE_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_PRE_RESTORE_STUB.firstCall.calledBefore(RESTORE_STUB.firstCall), true, "The 'onPreRestore' method should be called before the 'restore' method");
			strictEqual(ON_POST_RESTORE_STUB.firstCall.calledAfter(RESTORE_STUB.firstCall), true, "The 'onPostRestore' method should be called after the 'restore' method");
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
			strictEqual(ON_PRE_DESTROY_STUB.callCount, 1, "The 'onPreDestroy' method should be called exactly once");
			deepStrictEqual(ON_PRE_DESTROY_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_POST_DESTROY_STUB.callCount, 1, "The 'onPostDestroy' method should be called exactly once");
			deepStrictEqual(ON_POST_DESTROY_STUB.firstCall.args, [ENTITY]);
			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should be called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [ENTITY]);
			strictEqual(ON_PRE_DESTROY_STUB.firstCall.calledBefore(DESTROY_STUB.firstCall), true, "The 'onPreDestroy' method should be called before the 'destroy' method");
			strictEqual(ON_POST_DESTROY_STUB.firstCall.calledAfter(DESTROY_STUB.firstCall), true, "The 'onPostDestroy' method should be called after the 'destroy' method");
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

	describe("create", (): void => {
		it("should return an instance of the model", async (): Promise<void> => {
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

	describe("createOptional", (): void => {
		it("should return an instance of the model", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			const RESULT: unknown = REPOSITORY["createOptional"](DATA);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});

		it("should return undefined if given a nullish value", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			strictEqual(await REPOSITORY["createOptional"](null), undefined);
			strictEqual(await REPOSITORY["createOptional"](undefined), undefined);
		});
	});

	describe("createMany", (): void => {
		it("should return an array of instances of the model", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ persistenceInRepositoryStatus: ModelRepositoryStatusEnum.SAVED });

			const RESULT: unknown = REPOSITORY["createMany"]([DATA, DATA, DATA]);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, [EXPECTED, EXPECTED, EXPECTED]);
		});
	});
});
