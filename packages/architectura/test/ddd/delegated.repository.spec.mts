import { after, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, doesNotReject, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { ReflectUtility, instanceOf } from "@vitruvius-labs/toolbox";
import { BaseFactory, BaseModel, type BaseModelInstantiationInterface, DelegatedRepository, type ModelMetadataInterface } from "../../src/_index.mjs";

describe("DelegatedRepository", (): void => {
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

	interface DummyMetaInterface
	{
		id: bigint;
		uuid: string;
		createdAt: Date;
		updatedAt: Date;
	}

	interface DummyInterface extends DummyMetaInterface
	{
	}

	class DummyDelegate
	{
		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		public async fetchByUUID(uuid: string): Promise<DummyInterface | undefined>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		public async fetchById(id: bigint): Promise<DummyInterface | undefined>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		public async register(model: DummyModel): Promise<DummyMetaInterface>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		public async update(model: DummyModel): Promise<DummyMetaInterface>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		public async destroy(id: bigint): Promise<void>
		{
			return await Promise.reject(new Error("Should not be called"));
		}
	}

	class DummyRepository extends DelegatedRepository<DummyModel, BaseModelInstantiationInterface, typeof DummyModel, DummyDelegate, DummyMetaInterface, DummyInterface>
	{
		protected convertMetaData(data: DummyMetaInterface): ModelMetadataInterface
		{
			return {
				...data,
				deletedAt: null,
			};
		}

		protected convertData(data: DummyInterface): (BaseModelInstantiationInterface & ModelMetadataInterface)
		{
			return this.convertMetaData(data);
		}

		protected async fetchByUUID(uuid: string): Promise<DummyInterface | undefined>
		{
			return await this.delegate.fetchByUUID(uuid);
		}

		protected async fetchById(id: bigint): Promise<DummyInterface | undefined>
		{
			return await this.delegate.fetchById(id);
		}

		protected async register(model: DummyModel): Promise<DummyMetaInterface>
		{
			return await this.delegate.register(model);
		}

		protected async update(model: DummyModel): Promise<DummyMetaInterface>
		{
			return await this.delegate.update(model);
		}

		protected async destroy(id: bigint): Promise<void>
		{
			return await this.delegate.destroy(id);
		}
	}

	const DELEGATE: DummyDelegate = new DummyDelegate();

	const FETCH_UUID_STUB: SinonStub = stub(DELEGATE, "fetchByUUID");
	const FETCH_ID_STUB: SinonStub = stub(DELEGATE, "fetchById");
	const REGISTER_STUB: SinonStub = stub(DELEGATE, "register");
	const UPDATE_STUB: SinonStub = stub(DELEGATE, "update");
	const DESTROY_STUB: SinonStub = stub(DELEGATE, "destroy");

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
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			strictEqual(ReflectUtility.Get(REPOSITORY, "factory"), FACTORY);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model then set the metadata", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const DATE: Date = new Date();

			const MODEL: unknown = ReflectUtility.Call(REPOSITORY, "create", {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			});

			instanceOf(MODEL, DummyModel);
			strictEqual(ReflectUtility.Get(MODEL, "id"), 1n);
			strictEqual(ReflectUtility.Get(MODEL, "uuid"), "00000000-0000-0000-0000-000000000000");
			strictEqual(ReflectUtility.Get(MODEL, "createdAt"), DATE);
			strictEqual(ReflectUtility.Get(MODEL, "updatedAt"), DATE);
			strictEqual(ReflectUtility.Get(MODEL, "deletedAt"), undefined);
		});
	});

	describe("findByUUID", (): void => {
		it("should return undefined if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			FETCH_UUID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);
			FETCH_UUID_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.findByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getByUUID", (): void => {
		it("should throw if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			FETCH_UUID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000"), createErrorTest());
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);
			FETCH_UUID_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.getByUUID("00000000-0000-0000-0000-000000000000");

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("findById", (): void => {
		it("should return undefined if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			FETCH_ID_STUB.resolves(undefined);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			strictEqual(await RESULT, undefined);
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);
			FETCH_ID_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.findById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("getById", (): void => {
		it("should throw if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			FETCH_ID_STUB.resolves(undefined);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);
			FETCH_ID_STUB.resolves(METADATA);

			const RESULT: unknown = REPOSITORY.getById(1n);

			instanceOf(RESULT, Promise);
			await doesNotReject(RESULT);
			deepStrictEqual(await RESULT, EXPECTED);
		});
	});

	describe("save", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);
			REGISTER_STUB.resolves(METADATA);

			await REPOSITORY.save(ENTITY);

			strictEqual(REGISTER_STUB.callCount, 1, "The 'register' method should be called exactly once");
			deepStrictEqual(REGISTER_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should update an existing entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(ENTITY, DummyModel);

			const EXPECTED: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(EXPECTED, DummyModel);

			UPDATE_STUB.resolves(METADATA);

			await REPOSITORY.save(ENTITY);

			strictEqual(UPDATE_STUB.callCount, 1, "The 'update' method should be called exactly once");
			deepStrictEqual(UPDATE_STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});

	describe("delete", (): void => {
		it("should destroy an existing entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY, DELEGATE);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "00000000-0000-0000-0000-000000000000",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: unknown = ReflectUtility.Call(REPOSITORY, "create", METADATA);

			instanceOf(ENTITY, DummyModel);

			const EXPECTED: DummyModel = new DummyModel({ uuid: "00000000-0000-0000-0000-000000000000" });

			DESTROY_STUB.resolves(METADATA);

			await REPOSITORY.delete(ENTITY);

			strictEqual(DESTROY_STUB.callCount, 1, "The 'destroy' method should be called exactly once");
			deepStrictEqual(DESTROY_STUB.firstCall.args, [1n]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});
});
