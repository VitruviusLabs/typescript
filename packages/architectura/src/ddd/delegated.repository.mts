import type { BaseModel } from "./base.model.mjs";
import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import type { ModelMetadataInterface } from "./definition/interface/model-metadata.interface.mjs";
import type { BaseFactory } from "./base.factory.mjs";
import { ReflectUtility } from "@vitruvius-labs/toolbox";

/**
 * Delegated repository for storing entities
 *
 * @remarks
 * This repository delegates the actual storage and retrieval of entities data to another object.
 * Adds three type variables compared to BaseRepository
 * - D: The delegate object that will handle the actual storage and retrieval of entities data.
 * - X: The type of the metadata that will be stored and retrieved.
 * - T: The type of the data that will be stored and retrieved.
  */
abstract class DelegatedRepository<
	M extends BaseModel,
	I extends BaseModelInstantiationInterface,
	C extends new (arg: I) => M,
	D extends object,
	X extends object,
	T extends X
>
{
	protected readonly delegate: D;
	private readonly factory: BaseFactory<M, I, C>;

	/**
	 * Create a new repository
	 */
	public constructor(factory: BaseFactory<M, I, C>, delegate: D)
	{
		this.factory = factory;
		this.delegate = delegate;
	}

	private static SetImmutableFields(model: BaseModel, data: ModelMetadataInterface): void
	{
		ReflectUtility.Set(model, "id", BigInt(data.id));
		ReflectUtility.Set(model, "createdAt", data.createdAt);
		ReflectUtility.Set(model, "updatedAt", data.updatedAt);
		ReflectUtility.Set(model, "deletedAt", data.deletedAt ?? undefined);
	}

	private static ClearImmutableFields(model: BaseModel): void
	{
		ReflectUtility.Set(model, "id", undefined);
		ReflectUtility.Set(model, "createdAt", undefined);
		ReflectUtility.Set(model, "updatedAt", undefined);
		ReflectUtility.Set(model, "deletedAt", undefined);
	}

	/**
	 * Process metadata for model update.
	 */
	protected abstract convertMetaData(data: X): ModelMetadataInterface;

	/**
	 * Process data for model instantiation.
	 */
	protected abstract convertData(data: T): I & ModelMetadataInterface;

	/**
	 * Fetch an entity by its UUID.
	 *
	 * @remarks
	 * Used by both the findByUUID and getByUUID methods.
	 */
	protected abstract fetchByUUID(uuid: string): Promise<T | undefined>;

	/**
	 * Fetch an entity by its id.
	 *
	 * @remarks
	 * Used by both the findById and getById methods.
	 */
	protected abstract fetchById(id: bigint): Promise<T | undefined>;

	/**
	 * Register a new entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract register(model: M): Promise<X>;

	/**
	 * Update an existing entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract update(model: M): Promise<X>;

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
	public async findByUUID(uuid: string): Promise<M | undefined>
	{
		const data: T | undefined = await this.fetchByUUID(uuid);

		if (data === undefined)
		{
			return undefined;
		}

		const model: M = this.create(data);

		return model;
	}

	/**
	 * Retrieve an entity by its UUID.
	 *
	 * @throws if it doesn't exists.
	 */
	public async getByUUID(uuid: string): Promise<M>
	{
		const model: M | undefined = await this.findByUUID(uuid);

		if (model === undefined)
		{
			throw new Error(`Entity with UUID ${uuid} not found.`);
		}

		return model;
	}

	/**
	 * Retrieve an entity by its id if it exists.
	 */
	public async findById(id: bigint): Promise<M | undefined>
	{
		const data: T | undefined = await this.fetchById(id);

		if (data === undefined)
		{
			return undefined;
		}

		const model: M = this.create(data);

		return model;
	}

	/**
	 * Retrieve an entity by its id.
	 *
	 * @throws if it doesn't exists.
	 */
	public async getById(id: bigint): Promise<M>
	{
		const model: M | undefined = await this.findById(id);

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
	public async save(model: M): Promise<void>
	{
		if (model.hasId())
		{
			const update_metadata: X = await this.update(model);

			DelegatedRepository.SetImmutableFields(model, this.convertMetaData(update_metadata));

			return;
		}

		const register_metadata: X = await this.register(model);

		DelegatedRepository.SetImmutableFields(model, this.convertMetaData(register_metadata));
	}

	/**
	 * Delete an entity.
	 *
	 * @throws if the entity has not been saved
	 */
	public async delete(model: M): Promise<void>
	{
		await this.destroy(model.getId());

		DelegatedRepository.ClearImmutableFields(model);
	}

	/**
	 * Create an existing entity.
	 *
	 * @remarks
	 * Use this method to create entities in custom getters.
	 * Using the factory directly would erroneously create duplicate.
	 * Depends on the `convert` method to properly format the data.
	 *
	 * @sealed
	 */
	protected create(data: T): M
	{
		const normalized_data: I & ModelMetadataInterface = this.convertData(data);
		const model: M = this.factory.create(normalized_data);

		DelegatedRepository.SetImmutableFields(model, normalized_data);

		return model;
	}
}

export { DelegatedRepository };
