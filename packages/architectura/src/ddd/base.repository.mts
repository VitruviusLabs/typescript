import type { BaseModel } from "./base.model.mjs";
import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import type { ModelMetadataInterface } from "./definition/interface/model-metadata.interface.mjs";
import type { BaseFactory } from "./base.factory.mjs";

/**
 * Base repository for storing entities
 */
abstract class BaseRepository<
	T extends BaseModel,
	I extends BaseModelInstantiationInterface,
	C extends new (arg: I) => T
>
{
	private readonly factory: BaseFactory<T, I, C>;

	/**
	 * Create a new repository
	 */
	public constructor(factory: BaseFactory<T, I, C>)
	{
		this.factory = factory;
	}

	private static SetImmutableFields(model: BaseModel, data: ModelMetadataInterface): void
	{
		Reflect.set(model, "id", BigInt(data.id));
		Reflect.set(model, "createdAt", data.createdAt);
		Reflect.set(model, "updatedAt", data.updatedAt);
		Reflect.set(model, "deletedAt", data.deletedAt ?? undefined);
	}

	private static ClearImmutableFields(model: BaseModel): void
	{
		Reflect.set(model, "id", undefined);
		Reflect.set(model, "createdAt", undefined);
		Reflect.set(model, "updatedAt", undefined);
		Reflect.set(model, "deletedAt", undefined);
	}

	/**
	 * Fetch an entity by its UUID.
	 *
	 * @remarks
	 * Used by both the findByUUID and getByUUID methods.
	 */
	protected abstract fetchByUUID(uuid: string): Promise<(I & ModelMetadataInterface) | undefined>;

	/**
	 * Fetch an entity by its id.
	 *
	 * @remarks
	 * Used by both the findById and getById methods.
	 */
	protected abstract fetchById(id: bigint): Promise<(I & ModelMetadataInterface) | undefined>;

	/**
	 * Register a new entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract register(model: T): Promise<ModelMetadataInterface>;

	/**
	 * Update an existing entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract update(model: T): Promise<ModelMetadataInterface>;

	/**
	 * Delete an existing entity.
	 *
	 * @remarks
	 * Used by the delete method.
	 */
	protected abstract destroy(id: bigint): Promise<void>;

	/**
	 * Retrieve an entity by its UUID if it exists.
	 */
	public async findByUUID(uuid: string): Promise<T | undefined>
	{
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchByUUID(uuid);

		if (data === undefined)
		{
			return undefined;
		}

		const model: T = this.create(data);

		return model;
	}

	/**
	 * Retrieve an entity by its UUID.
	 *
	 * @throws if it doesn't exists.
	 */
	public async getByUUID(uuid: string): Promise<T>
	{
		const model: T | undefined = await this.findByUUID(uuid);

		if (model === undefined)
		{
			throw new Error(`Entity with UUID ${uuid} not found.`);
		}

		return model;
	}

	/**
	 * Retrieve an entity by its id if it exists.
	 */
	public async findById(id: bigint): Promise<T | undefined>
	{
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchById(id);

		if (data === undefined)
		{
			return undefined;
		}

		const model: T = this.create(data);

		return model;
	}

	/**
	 * Retrieve an entity by its id.
	 *
	 * @throws if it doesn't exists.
	 */
	public async getById(id: bigint): Promise<T>
	{
		const model: T | undefined = await this.findById(id);

		if (model === undefined)
		{
			throw new Error(`Entity with id ${id.toString()} not found.`);
		}

		return model;
	}

	/**
	 * Save an entity.
	 *
	 * @remarks
	 * This method will either register a new entity or update an existing one.
	 */
	public async save(model: T): Promise<void>
	{
		if (model.hasId())
		{
			const update_metadata: ModelMetadataInterface = await this.update(model);

			BaseRepository.SetImmutableFields(model, update_metadata);

			return;
		}

		const register_metadata: ModelMetadataInterface = await this.register(model);

		BaseRepository.SetImmutableFields(model, register_metadata);
	}

	/**
	 * Delete an entity.
	 *
	 * @throws if the entity has not been saved
	 */
	public async delete(model: T): Promise<void>
	{
		await this.destroy(model.getId());

		BaseRepository.ClearImmutableFields(model);
	}

	/**
	 * Create an existing entity.
	 *
	 * @remarks
	 * Use this method to create entities in custom getters.
	 * Using the factory directly would erroneously create duplicate.
	 */
	protected create(parameters: I & ModelMetadataInterface): T
	{
		const model: T = this.factory.create(parameters);

		BaseRepository.SetImmutableFields(model, parameters);

		return model;
	}
}

export { BaseRepository };
