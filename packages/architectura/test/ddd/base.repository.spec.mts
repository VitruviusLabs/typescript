import { afterEach, beforeEach, describe, it } from "node:test";
import { deepStrictEqual, rejects, strictEqual } from "node:assert";
import { type SinonStub, stub } from "sinon";
import { BaseFactory, BaseModel, type BaseModelInstantiationInterface, BaseRepository, type ModelMetadataInterface } from "../../src/_index.mjs";
import { createErrorTest } from "@vitruvius-labs/testing-ground";
import { strictResolves } from "../utils/assert/strict-resolves.mjs";
import { deepStrictResolves } from "../utils/assert/deep-strict-resolves.mjs";
import { asStub } from "../utils/as-stub.mjs";

describe("BaseRepository", (): void => {
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

	class DummyRepository extends BaseRepository<DummyModel, BaseModelInstantiationInterface, typeof DummyModel>
	{
		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		protected async fetchByUUID(uuid: string): Promise<(BaseModelInstantiationInterface & ModelMetadataInterface) | undefined>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		protected async fetchById(id: bigint): Promise<(BaseModelInstantiationInterface & ModelMetadataInterface) | undefined>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		protected async register(model: DummyModel): Promise<ModelMetadataInterface>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		protected async update(model: DummyModel): Promise<ModelMetadataInterface>
		{
			return await Promise.reject(new Error("Should not be called"));
		}

		// @ts-expect-error: Test class
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Test class
		protected async destroy(id: bigint): Promise<void>
		{
			return await Promise.reject(new Error("Should not be called"));
		}
	}

	beforeEach((): void => {
		// @ts-expect-error: Stub protected method
		stub(DummyRepository.prototype, "fetchByUUID").rejects();
		// @ts-expect-error: Stub protected method
		stub(DummyRepository.prototype, "fetchById").rejects();
		// @ts-expect-error: Stub protected method
		stub(DummyRepository.prototype, "register").rejects();
		// @ts-expect-error: Stub protected method
		stub(DummyRepository.prototype, "update").rejects();
		// @ts-expect-error: Stub protected method
		stub(DummyRepository.prototype, "destroy").rejects();
	});

	afterEach((): void => {
		asStub(Reflect.get(DummyRepository.prototype, "fetchByUUID")).restore();
		asStub(Reflect.get(DummyRepository.prototype, "fetchById")).restore();
		asStub(Reflect.get(DummyRepository.prototype, "register")).restore();
		asStub(Reflect.get(DummyRepository.prototype, "update")).restore();
		asStub(Reflect.get(DummyRepository.prototype, "destroy")).restore();
	});

	describe("constructor", (): void => {
		it("should create a new repository", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			strictEqual(Reflect.get(REPOSITORY, "factory"), FACTORY);
		});
	});

	describe("create", (): void => {
		it("should return a new instance of the model then set the metadata", (): void => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const DATE: Date = new Date();

			const MODEL: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: DATE,
				updatedAt: DATE,
				deletedAt: null,
			});

			strictEqual(Reflect.get(MODEL, "id"), 1n);
			strictEqual(Reflect.get(MODEL, "uuid"), "lorem-ipsum");
			strictEqual(Reflect.get(MODEL, "createdAt"), DATE);
			strictEqual(Reflect.get(MODEL, "updatedAt"), DATE);
			strictEqual(Reflect.get(MODEL, "deletedAt"), undefined);
		});
	});

	describe("findByUUID", (): void => {
		it("should return undefined if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			asStub(Reflect.get(REPOSITORY, "fetchByUUID")).resolves(undefined);

			await strictResolves(REPOSITORY.findByUUID("lorem-ipsum"), undefined);
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			asStub(Reflect.get(REPOSITORY, "fetchByUUID")).resolves(METADATA);

			await deepStrictResolves(REPOSITORY.findByUUID("lorem-ipsum"), EXPECTED);
		});
	});

	describe("getByUUID", (): void => {
		it("should throw if no entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			asStub(Reflect.get(REPOSITORY, "fetchByUUID")).resolves(undefined);

			await rejects(REPOSITORY.getByUUID("lorem-ipsum"), createErrorTest());
		});

		it("should return an instance of the model if an entity with this UUID exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			asStub(Reflect.get(REPOSITORY, "fetchByUUID")).resolves(METADATA);

			await deepStrictResolves(REPOSITORY.getByUUID("lorem-ipsum"), EXPECTED);
		});
	});

	describe("findById", (): void => {
		it("should return undefined if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			asStub(Reflect.get(REPOSITORY, "fetchById")).resolves(undefined);

			await strictResolves(REPOSITORY.findById(1n), undefined);
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			asStub(Reflect.get(REPOSITORY, "fetchById")).resolves(METADATA);

			await deepStrictResolves(REPOSITORY.findById(1n), EXPECTED);
		});
	});

	describe("getById", (): void => {
		it("should throw if no entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			asStub(Reflect.get(REPOSITORY, "fetchById")).resolves(undefined);

			await rejects(REPOSITORY.getById(1n), createErrorTest());
		});

		it("should return an instance of the model if an entity with this id exists", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			asStub(Reflect.get(REPOSITORY, "fetchById")).resolves(METADATA);

			await deepStrictResolves(REPOSITORY.getById(1n), EXPECTED);
		});
	});

	describe("save", (): void => {
		it("should register a new entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: DummyModel = new DummyModel({ uuid: "lorem-ipsum" });
			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			const STUB: SinonStub = asStub(Reflect.get(REPOSITORY, "register"));

			STUB.resolves(METADATA);

			await REPOSITORY.save(ENTITY);

			strictEqual(STUB.calledOnce, true, "The 'register' method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});

		it("should update an existing entity, then update its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);
			const EXPECTED: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);

			const STUB: SinonStub = asStub(Reflect.get(REPOSITORY, "update"));

			STUB.resolves(METADATA);

			await REPOSITORY.save(ENTITY);

			strictEqual(STUB.calledOnce, true, "The 'update' method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [ENTITY]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});

	describe("delete", (): void => {
		it("should destroy an existing entity, then clear its metadata", async (): Promise<void> => {
			const FACTORY: DummyFactory = new DummyFactory(DummyModel);
			const REPOSITORY: DummyRepository = new DummyRepository(FACTORY);

			const METADATA: ModelMetadataInterface = {
				id: 1n,
				uuid: "lorem-ipsum",
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			};

			const ENTITY: DummyModel = Reflect.get(REPOSITORY, "create").call(REPOSITORY, METADATA);
			const EXPECTED: DummyModel = new DummyModel({ uuid: "lorem-ipsum" });

			const STUB: SinonStub = asStub(Reflect.get(REPOSITORY, "destroy"));

			STUB.resolves(METADATA);

			await REPOSITORY.delete(ENTITY);

			strictEqual(STUB.calledOnce, true, "The 'destroy' method should be called exactly once");
			deepStrictEqual(STUB.firstCall.args, [1n]);
			deepStrictEqual(ENTITY, EXPECTED);
		});
	});
});
