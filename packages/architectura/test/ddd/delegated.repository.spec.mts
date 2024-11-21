import type { ModelMetadataInterface } from "../../src/_index.mjs";
import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { instanceOf } from "@vitruvius-labs/toolbox";
import { DummyDelegate, type DummyDelegateDataInterface, DummyDelegatedRepository, DummyModel, DummyTransformFactory, getDummy } from "../../mock/_index.mjs";

describe("DelegatedRepository", (): void => {
	const CREATE_STUB: SinonStub = stub(DummyTransformFactory.prototype, "createFromRepositoryData");
	// @ts-expect-error: Stubbing protected method for testing purposes
	const FETCH_ID_STUB: SinonStub = stub(DummyDelegatedRepository.prototype, "fetchById");
	// @ts-expect-error: Stubbing protected method for testing purposes
	const FETCH_UUID_STUB: SinonStub = stub(DummyDelegatedRepository.prototype, "fetchByUUID");
	// @ts-expect-error: Stubbing protected method for testing purposes
	const REGISTER_STUB: SinonStub = stub(DummyDelegatedRepository.prototype, "register");
	// @ts-expect-error: Stubbing protected method for testing purposes
	const UPDATE_STUB: SinonStub = stub(DummyDelegatedRepository.prototype, "update");
	// @ts-expect-error: Stubbing protected method for testing purposes
	const DESTROY_STUB: SinonStub = stub(DummyDelegatedRepository.prototype, "destroy");

	beforeEach((): void => {
		CREATE_STUB.reset();
		CREATE_STUB.callThrough();
		FETCH_ID_STUB.reset();
		FETCH_ID_STUB.callThrough();
		FETCH_UUID_STUB.reset();
		FETCH_UUID_STUB.callThrough();
		REGISTER_STUB.reset();
		REGISTER_STUB.callThrough();
		UPDATE_STUB.reset();
		UPDATE_STUB.callThrough();
		DESTROY_STUB.reset();
		DESTROY_STUB.callThrough();
	});

	after((): void => {
		CREATE_STUB.restore();
		FETCH_ID_STUB.restore();
		FETCH_UUID_STUB.restore();
		REGISTER_STUB.restore();
		UPDATE_STUB.restore();
		DESTROY_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new repository", (): void => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			strictEqual(REPOSITORY["factory"], FACTORY);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model then set the metadata", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: "0",
			};

			const EXPECTED: DummyModel = getDummy(DATE);

			CREATE_STUB.resolves(EXPECTED);

			const RESULT: unknown = REPOSITORY["create"](DATA);

			instanceOf(RESULT, Promise);
			strictEqual(CREATE_STUB.callCount, 1, "The factory 'createFromRepositoryData' method should have been called exactly once");
			deepStrictEqual(CREATE_STUB.firstCall.args, [DATA]);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findByUUID", (): void => {
		it("should return undefined if no entity with this UUID exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			FETCH_UUID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_UUID_STUB.callCount, 1, "The 'fetchByUUID' method should have been called exactly once");
			deepStrictEqual(FETCH_UUID_STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			strictEqual(CREATE_STUB.callCount, 0, "The factory 'createFromRepositoryData' method should not have been called");
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: "0",
			};

			const EXPECTED: DummyModel = getDummy(DATE);

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_UUID_STUB.callCount, 1, "The 'fetchByUUID' method should have been called exactly once");
			deepStrictEqual(FETCH_UUID_STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			strictEqual(CREATE_STUB.callCount, 1, "The factory 'createFromRepositoryData' method should have been called exactly once");
			deepStrictEqual(CREATE_STUB.firstCall.args, [DATA]);
			strictEqual(FETCH_UUID_STUB.firstCall.calledBefore(CREATE_STUB.firstCall), true, "The 'fetchByUUID' method should have been called before the factory 'createFromRepositoryData' method");
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getByUUID", (): void => {
		it("should throw if no entity with this UUID exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			FETCH_UUID_STUB.rejects();

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await rejects(RESULT, createErrorTest());
			strictEqual(FETCH_UUID_STUB.callCount, 1, "The 'fetchByUUID' method should have been called exactly once");
			deepStrictEqual(FETCH_UUID_STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			strictEqual(CREATE_STUB.callCount, 0, "The factory 'createFromRepositoryData' method should not have been called");
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: "0",
			};

			const EXPECTED: DummyModel = getDummy(DATE);

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_UUID_STUB.callCount, 1, "The 'fetchByUUID' method should have been called exactly once");
			deepStrictEqual(FETCH_UUID_STUB.firstCall.args, ["00000000-0000-0000-0000-000000000000"]);
			strictEqual(CREATE_STUB.callCount, 1, "The factory 'createFromRepositoryData' method should have been called exactly once");
			deepStrictEqual(CREATE_STUB.firstCall.args, [DATA]);
			strictEqual(FETCH_UUID_STUB.firstCall.calledBefore(CREATE_STUB.firstCall), true, "The 'fetchByUUID' method should have been called before the factory 'createFromRepositoryData' method");
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findById", (): void => {
		it("should return undefined if no entity with this id exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			FETCH_ID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findById(0n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_ID_STUB.callCount, 1, "The 'fetchById' method should have been called exactly once");
			deepStrictEqual(FETCH_ID_STUB.firstCall.args, [0n]);
			strictEqual(CREATE_STUB.callCount, 0, "The factory 'createFromRepositoryData' method should not have been called");
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: "0",
			};

			const EXPECTED: DummyModel = getDummy(DATE);

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(0n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_ID_STUB.callCount, 1, "The 'fetchById' method should have been called exactly once");
			deepStrictEqual(FETCH_ID_STUB.firstCall.args, [0n]);
			strictEqual(CREATE_STUB.callCount, 1, "The factory 'createFromRepositoryData' method should have been called exactly once");
			deepStrictEqual(CREATE_STUB.firstCall.args, [DATA]);
			strictEqual(FETCH_ID_STUB.firstCall.calledBefore(CREATE_STUB.firstCall), true, "The 'fetchById' method should have been called before the factory 'createFromRepositoryData' method");
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getById", (): void => {
		it("should throw if no entity with this id exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			FETCH_ID_STUB.rejects();

			const RESULT: unknown = REPOSITORY.findById(0n);

			instanceOf(RESULT, Promise);
			await rejects(RESULT, createErrorTest());
			strictEqual(FETCH_ID_STUB.callCount, 1, "The 'fetchById' method should have been called exactly once");
			deepStrictEqual(FETCH_ID_STUB.firstCall.args, [0n]);
			strictEqual(CREATE_STUB.callCount, 0, "The factory 'createFromRepositoryData' method should not have been called");
		});

		it("should return an instance of the model if an entity with this ID exists", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const DATA: DummyDelegateDataInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: "0",
			};

			const EXPECTED: DummyModel = getDummy(DATE);

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(0n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(FETCH_ID_STUB.callCount, 1, "The 'fetchById' method should have been called exactly once");
			deepStrictEqual(FETCH_ID_STUB.firstCall.args, [0n]);
			strictEqual(CREATE_STUB.callCount, 1, "The factory 'createFromRepositoryData' method should have been called exactly once");
			deepStrictEqual(CREATE_STUB.firstCall.args, [DATA]);
			strictEqual(FETCH_ID_STUB.firstCall.calledBefore(CREATE_STUB.firstCall), true, "The 'fetchById' method should have been called before the factory 'createFromRepositoryData' method");
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("save", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const METADATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			};

			const ENTITY: DummyModel = getDummy();

			const EXPECTED: DummyModel = getDummy(DATE);

			REGISTER_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(REGISTER_STUB.callCount, 1, "The 'register' method should have been called exactly once");
			deepStrictEqual(REGISTER_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should update an existing entity, then update its metadata", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const METADATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			};

			const ENTITY: DummyModel = getDummy(DATE);

			const EXPECTED: DummyModel = getDummy(DATE);

			UPDATE_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should have been called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});

	describe("delete", (): void => {
		it("should destroy an existing entity, then clear its metadata", async (): Promise<void> => {
			const DELEGATE: DummyDelegate = new DummyDelegate();
			const FACTORY: DummyTransformFactory = new DummyTransformFactory(DummyModel);
			const REPOSITORY: DummyDelegatedRepository = new DummyDelegatedRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const METADATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: DATE,
			};

			const ENTITY: DummyModel = getDummy(DATE);

			const EXPECTED: DummyModel = getDummy();

			DESTROY_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.delete(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should have been called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [0n]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});
});
