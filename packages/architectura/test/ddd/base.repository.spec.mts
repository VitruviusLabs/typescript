import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { instanceOf } from "@vitruvius-labs/toolbox";
import type { ModelMetadataInterface } from "../../src/_index.mjs";
import { DummyAdvancedFactory, type DummyInstantiationInterface, DummyModel, DummyRepository, getDummy } from "../../mock/_index.mjs";

describe("BaseRepository", (): void => {
	// @ts-expect-error: Stub protected method
	const FETCH_UUID_STUB: SinonStub = stub(DummyRepository.prototype, "fetchByUUID");
	// @ts-expect-error: Stub protected method
	const FETCH_ID_STUB: SinonStub = stub(DummyRepository.prototype, "fetchById");
	// @ts-expect-error: Stub protected method
	const REGISTER_STUB: SinonStub = stub(DummyRepository.prototype, "register");
	// @ts-expect-error: Stub protected method
	const UPDATE_STUB: SinonStub = stub(DummyRepository.prototype, "update");
	// @ts-expect-error: Stub protected method
	const DESTROY_STUB: SinonStub = stub(DummyRepository.prototype, "destroy");

	beforeEach((): void => {
		FETCH_UUID_STUB.reset();
		FETCH_UUID_STUB.rejects();
		FETCH_ID_STUB.reset();
		FETCH_ID_STUB.rejects();
		REGISTER_STUB.reset();
		REGISTER_STUB.rejects();
		UPDATE_STUB.reset();
		UPDATE_STUB.rejects();
		DESTROY_STUB.reset();
		DESTROY_STUB.rejects();
	});

	after((): void => {
		FETCH_UUID_STUB.restore();
		FETCH_ID_STUB.restore();
		REGISTER_STUB.restore();
		UPDATE_STUB.restore();
		DESTROY_STUB.restore();
	});

	describe("constructor", (): void => {
		it("should create a new repository", (): void => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			strictEqual(REPOSITORY["factory"], FACTORY);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model then set the metadata", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);

			const RESULT: unknown = REPOSITORY["create"]({
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: 0,
			});

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findByUUID", (): void => {
		it("should return undefined if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);

			const DATA: DummyInstantiationInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: 0,
			};

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getByUUID", (): void => {
		it("should throw if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			FETCH_UUID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000"), createErrorTest());
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);

			const DATA: DummyInstantiationInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: 0,
			};

			FETCH_UUID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findById", (): void => {
		it("should return undefined if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);

			const DATA: DummyInstantiationInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: 0,
			};

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getById", (): void => {
		it("should throw if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			FETCH_ID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);

			const DATA: DummyInstantiationInterface & ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
				value: 0,
			};

			FETCH_ID_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.getById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("save", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);
			const ENTITY: DummyModel = getDummy();

			const DATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			};

			REGISTER_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(REGISTER_STUB.callCount, 1, "The 'register' method should be called exactly once");
			deepStrictEqual(REGISTER_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should update an existing entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy(DATE);
			const ENTITY: DummyModel = getDummy(DATE);

			const DATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			};

			UPDATE_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.save(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should be called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});

	describe("delete", (): void => {
		it("should destroy an existing entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummyAdvancedFactory = new DummyAdvancedFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();
			const EXPECTED: DummyModel = getDummy();
			const ENTITY: DummyModel = getDummy(DATE);

			const DATA: ModelMetadataInterface = {
				id: 0n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: DATE,
			};

			DESTROY_STUB.resolves(DATA);

			const RESULT: unknown = REPOSITORY.delete(ENTITY);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should be called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [0n]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});
});
