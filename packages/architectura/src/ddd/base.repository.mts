import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import type { ModelMetadataInterface } from "./definition/interface/model-metadata.interface.mjs";
import type { AdvancedFactory } from "./advanced.factory.mjs";
import { ReflectUtility } from "@vitruvius-labs/toolbox";

/**
 * Base repository for storing entities
 *
 * @remarks
 * The type parameters are as follows:
 * - M: The model that will be stored and retrieved.
 * - C: The constructor of the model that will be stored and retrieved.
 * - I: The parameter expected by the factory.
 */
abstract class BaseRepository<
	M extends BaseModel,
	C extends ConstructorOf<M>,
	I = ConstructorParameters<C>[0]
>
{
	private readonly factory: AdvancedFactory<M, C, I>;

	/**
	 * Create a new repository
	 *
	 * @remarks
	 * Keeping the factory as a parameter of the repository avoid potential circular dependencies issues.
	**/
	public constructor(factory: AdvancedFactory<M, C, I>)
	{
		this.factory = factory;
	}

	private static SetImmutableFields(model: BaseModel, data: ModelMetadataInterface): void
	{
		ReflectUtility.Set(model, "id", BigInt(data.id));
		ReflectUtility.Set(model, "createdAt", data.createdAt);
		ReflectUtility.Set(model, "updatedAt", data.updatedAt);
		ReflectUtility.Set(model, "deletedAt", data.deletedAt ?? undefined);
		ReflectUtility.Set(model, "uuid", data.uuid);
	}

	private static ClearImmutableFields(model: BaseModel): void
	{
		ReflectUtility.Set(model, "id", undefined);
		ReflectUtility.Set(model, "createdAt", undefined);
		ReflectUtility.Set(model, "updatedAt", undefined);
		ReflectUtility.Set(model, "deletedAt", undefined);
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
	protected abstract register(model: M): Promise<ModelMetadataInterface>;

	/**
	 * Update an existing entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract update(model: M): Promise<ModelMetadataInterface>;

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
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchByUUID(uuid);

		if (data === undefined)
		{
			return undefined;
		}

		const model: M = await this.create(data);

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
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchById(id);

		if (data === undefined)
		{
			return undefined;
		}

		const model: M = await this.create(data);

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
	public async delete(model: M): Promise<void>
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
	 *
	 * @sealed
	 */
	protected async create(parameters: I & ModelMetadataInterface): Promise<M>
	{
		const model: M = await this.factory.createFromRepositoryData(parameters);

		BaseRepository.SetImmutableFields(model, parameters);

		return model;
	}
}

export { BaseRepository };
