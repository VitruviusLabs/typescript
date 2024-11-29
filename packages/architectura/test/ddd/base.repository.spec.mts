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
	const ENABLE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "enable");
	// @ts-expect-error: Stub protected method
	const DISABLE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "disable");
	// @ts-expect-error: Stub protected method
	const EXPUNGE_STUB: SinonStub = stub(DummyBaseRepository.prototype, "expunge");

	beforeEach((): void => {
		FETCH_UUID_STUB.reset();
		FETCH_UUID_STUB.rejects();
		FETCH_ID_STUB.reset();
		FETCH_ID_STUB.rejects();
		REGISTER_STUB.reset();
		REGISTER_STUB.rejects();
		UPDATE_STUB.reset();
		UPDATE_STUB.rejects();
		ENABLE_STUB.reset();
		ENABLE_STUB.rejects();
		DISABLE_STUB.reset();
		DISABLE_STUB.rejects();
		EXPUNGE_STUB.reset();
		EXPUNGE_STUB.rejects();
	});

	after((): void => {
		FETCH_UUID_STUB.restore();
		FETCH_ID_STUB.restore();
		REGISTER_STUB.restore();
		UPDATE_STUB.restore();
		ENABLE_STUB.restore();
		DISABLE_STUB.restore();
		EXPUNGE_STUB.restore();
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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getById(1n, { includeDeleted: true });

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("save", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.SAVED);
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW });

			REGISTER_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

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
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

			UPDATE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should be called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to save a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

			await rejects(REPOSITORY.save(ENTITY), createErrorTest());
		});

		it("should throw when trying to save a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.save(ENTITY), createErrorTest());
		});
	});

	describe("delete", (): void => {
		it("should throw when trying to soft delete a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.delete(ENTITY), createErrorTest());
		});

		it("should soft delete a saved entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

			DISABLE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.delete(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DISABLE_STUB.callCount, 1, "The 'disable' method should be called exactly once");
			deepStrictEqual(DISABLE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to soft delete a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

			await rejects(REPOSITORY.delete(ENTITY), createErrorTest());
		});

		it("should throw when trying to soft delete a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.delete(ENTITY), createErrorTest());
		});
	});

	describe("restore", (): void => {
		it("should throw when trying to restore a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.restore(ENTITY), createErrorTest());
		});

		it("should throw when trying to restore a saved entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

			await rejects(REPOSITORY.restore(ENTITY), createErrorTest());
		});

		it("should restore a soft deleted entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

			ENABLE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.restore(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(ENABLE_STUB.callCount, 1, "The 'enable' method should be called exactly once");
			deepStrictEqual(ENABLE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to restore a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.restore(ENTITY), createErrorTest());
		});
	});

	describe("destroy", (): void => {
		it("should throw when trying to destroy a new entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.NEW });

			await rejects(REPOSITORY.destroy(ENTITY), createErrorTest());
		});

		it("should hard destroy a saved entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.SAVED });

			EXPUNGE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.destroy(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(EXPUNGE_STUB.callCount, 1, "The 'expunge' method should be called exactly once");
			deepStrictEqual(EXPUNGE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should hard destroy a soft deleted entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = getDefaultDummyDelegateDataInterface(ModelRepositoryStatusEnum.DELETED);
			const EXPECTED: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });
			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DELETED });

			EXPUNGE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.destroy(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(EXPUNGE_STUB.callCount, 1, "The 'expunge' method should be called exactly once");
			deepStrictEqual(EXPUNGE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should throw when trying to destroy a destroyed entity", async (): Promise<void> => {
			const FACTORY: DummySimpleFactory = new DummySimpleFactory(DummyModel);
			const REPOSITORY: DummyBaseRepository = new DummyBaseRepository(FACTORY);

			const ENTITY: DummyModel = getDummy({ repositoryStatus: ModelRepositoryStatusEnum.DESTROYED });

			await rejects(REPOSITORY.destroy(ENTITY), createErrorTest());
		});
	});
});
