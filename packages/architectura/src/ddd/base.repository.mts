import type { AbstractConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { BaseModel } from "./base.model.mjs";
import type { ModelMetadataInterface } from "./definition/interface/model-metadata.interface.mjs";
import type { RepositoryQueryNormalizedOptionsInterface } from "./definition/interface/repository-query-normalized-options.interface.mjs";
import type { RepositoryQueryOptionsInterface } from "./definition/interface/repository-query-options.interface.mjs";
import type { BaseFactory } from "./base.factory.mjs";
import { ReflectUtility } from "@vitruvius-labs/toolbox";
import { isDefined } from "@vitruvius-labs/ts-predicate/type-guard";
import { ModelRepositoryStatusEnum } from "./definition/enum/model-repository-status.enum.mjs";

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
	C extends AbstractConstructorOf<M>,
	I = ConstructorParameters<C>[0]
>
{
	private readonly factory: BaseFactory<M, C, I>;

	/**
	 * Create a new repository
	 *
	 * @remarks
	 * Keeping the factory as a parameter of the repository avoid potential circular dependencies issues.
	**/
	public constructor(factory: BaseFactory<M, C, I>)
	{
		this.factory = factory;
	}

	private static SetMetadata(model: BaseModel, metadata: ModelMetadataInterface): void
	{
		ReflectUtility.Set(model, "id", BigInt(metadata.id));
		ReflectUtility.Set(model, "uuid", metadata.uuid);
		ReflectUtility.Set(model, "createdAt", new Date(metadata.createdAt));
		ReflectUtility.Set(model, "updatedAt", new Date(metadata.updatedAt));

		if (isDefined(metadata.deletedAt))
		{
			ReflectUtility.Set(model, "persistenceInRepositoryStatus", ModelRepositoryStatusEnum.DELETED);
			ReflectUtility.Set(model, "deletedAt", new Date(metadata.deletedAt));

			return;
		}

		ReflectUtility.Set(model, "persistenceInRepositoryStatus", ModelRepositoryStatusEnum.SAVED);
		ReflectUtility.Set(model, "deletedAt", undefined);
	}

	private static NormalizeOptions(options: RepositoryQueryOptionsInterface | undefined): RepositoryQueryNormalizedOptionsInterface
	{
		const dirty_options: RepositoryQueryOptionsInterface = options ?? {};

		return {
			includeDeleted: dirty_options.includeDeleted ?? false,
		};
	}

	/**
	 * Fetch an entity by its UUID.
	 *
	 * @remarks
	 * Used by both the findByUUID and getByUUID methods.
	 */
	protected abstract fetchByUUID(uuid: string, options: RepositoryQueryNormalizedOptionsInterface): Promise<(I & ModelMetadataInterface) | null | undefined>;

	/**
	 * Fetch an entity by its id.
	 *
	 * @remarks
	 * Used by both the findById and getById methods.
	 */
	protected abstract fetchById(id: bigint, options: RepositoryQueryNormalizedOptionsInterface): Promise<(I & ModelMetadataInterface) | null | undefined>;

	/**
	 * Register a new entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract register(model: M): Promise<Omit<ModelMetadataInterface, "deletedAt">>;

	/**
	 * Update an existing entity.
	 *
	 * @remarks
	 * Used by the save method.
	 */
	protected abstract update(model: M): Promise<{ updatedAt: Date | string | number }>;

	/**
	 * Undelete an existing entity.
	 *
	 * @remarks
	 * Used by the restore method.
	 */
	protected abstract restore(model: M): Promise<{ updatedAt: Date | string | number }>;

	/**
	 * Soft delete an existing entity.
	 *
	 * @remarks
	 * Used by the delete method.
	 */
	protected abstract delete(model: M): Promise<{ deletedAt: Date | string | number }>;

	/**
	 * Hard delete an existing entity.
	 *
	 * @remarks
	 * Used by the destroy method.
	 */
	protected abstract destroy(model: M): Promise<void>;

	/**
	 * Retrieve an entity by its UUID if it exists.
	 *
	 * @sealed
	 */
	public async findByUUID(uuid: string, options?: RepositoryQueryOptionsInterface): Promise<M | undefined>
	{
		const normalized_options: RepositoryQueryNormalizedOptionsInterface = BaseRepository.NormalizeOptions(options);

		const data: (I & ModelMetadataInterface) | null | undefined = await this.fetchByUUID(uuid, normalized_options);

		if (!isDefined(data))
		{
			return undefined;
		}

		// In case it is not handled by fetchByUUID
		if (isDefined(data.deletedAt) && !normalized_options.includeDeleted)
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
	 *
	 * @sealed
	 */
	public async getByUUID(uuid: string, options?: RepositoryQueryOptionsInterface): Promise<M>
	{
		const model: M | undefined = await this.findByUUID(uuid, options);

		if (model === undefined)
		{
			throw new Error(`Entity with UUID ${uuid} not found.`);
		}

		return model;
	}

	/**
	 * Retrieve an entity by its id if it exists.
	 *
	 * @sealed
	 */
	public async findById(id: bigint, options?: RepositoryQueryOptionsInterface): Promise<M | undefined>
	{
		const normalized_options: RepositoryQueryNormalizedOptionsInterface = BaseRepository.NormalizeOptions(options);

		const data: (I & ModelMetadataInterface) | null | undefined = await this.fetchById(id, normalized_options);

		if (!isDefined(data))
		{
			return undefined;
		}

		// In case it is not handled by fetchById
		if (isDefined(data.deletedAt) && !normalized_options.includeDeleted)
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
	 *
	 * @sealed
	 */
	public async getById(id: bigint, options?: RepositoryQueryOptionsInterface): Promise<M>
	{
		const model: M | undefined = await this.findById(id, options);

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
	 *
	 * @sealed
	 */
	public async saveModel(model: M): Promise<void>
	{
		switch (model.getPersistenceInRepositoryStatus())
		{
			case ModelRepositoryStatusEnum.NEW:
				{
					const metadata: Omit<ModelMetadataInterface, "deletedAt"> = await this.register(model);

					BaseRepository.SetMetadata(model, { ...metadata, deletedAt: undefined });
				}

				break;

			case ModelRepositoryStatusEnum.SAVED:
				{
					const metadata: { updatedAt: Date | string | number } = await this.update(model);

					ReflectUtility.Set(model, "updatedAt", new Date(metadata.updatedAt));
				}

				break;

			case ModelRepositoryStatusEnum.DELETED:
				throw new Error("You can't save a soft deleted entity, it must be restored first.");

			case ModelRepositoryStatusEnum.DESTROYED:
				throw new Error("You can't save a destroyed entity.");
		}
	}

	/**
	 * Undelete an entity.
	 *
	 * @throws if the entity is new, saved, or destroyed
	 *
	 * @sealed
	 */
	public async restoreModel(model: M): Promise<void>
	{
		if (model.getPersistenceInRepositoryStatus() !== ModelRepositoryStatusEnum.DELETED)
		{
			throw new Error(`You can't restore a ${model.getPersistenceInRepositoryStatus()} entity.`);
		}

		const metadata: { updatedAt: Date | string | number } = await this.restore(model);

		ReflectUtility.Set(model, "persistenceInRepositoryStatus", ModelRepositoryStatusEnum.SAVED);
		ReflectUtility.Set(model, "updatedAt", new Date(metadata.updatedAt));
		ReflectUtility.Set(model, "deletedAt", undefined);
	}

	/**
	 * Soft delete an entity.
	 *
	 * @throws if the entity is new, deleted, or destroyed
	 *
	 * @sealed
	 */
	public async deleteModel(model: M): Promise<void>
	{
		if (model.getPersistenceInRepositoryStatus() !== ModelRepositoryStatusEnum.SAVED)
		{
			throw new Error(`You can't soft delete a ${model.getPersistenceInRepositoryStatus()} entity.`);
		}

		const metadata: { deletedAt: Date | string | number } = await this.delete(model);

		ReflectUtility.Set(model, "persistenceInRepositoryStatus", ModelRepositoryStatusEnum.DELETED);
		ReflectUtility.Set(model, "updatedAt", new Date(metadata.deletedAt));
		ReflectUtility.Set(model, "deletedAt", new Date(metadata.deletedAt));
	}

	/**
	 * Hard delete an entity.
	 *
	 * @throws if the entity is new, or destroyed
	 *
	 * @sealed
	 */
	public async destroyModel(model: M): Promise<void>
	{
		if (
			model.getPersistenceInRepositoryStatus() === ModelRepositoryStatusEnum.NEW
			|| model.getPersistenceInRepositoryStatus() === ModelRepositoryStatusEnum.DESTROYED
		)
		{
			throw new Error(`You can't destroy a ${model.getPersistenceInRepositoryStatus()} entity.`);
		}

		await this.destroy(model);

		ReflectUtility.Set(model, "persistenceInRepositoryStatus", ModelRepositoryStatusEnum.DESTROYED);
		ReflectUtility.Set(model, "id", undefined);
		ReflectUtility.Set(model, "createdAt", undefined);
		ReflectUtility.Set(model, "updatedAt", undefined);
		ReflectUtility.Set(model, "deletedAt", undefined);
	}

	/**
	 * Create an existing entity.
	 *
	 * @remarks
	 * Use this method to create entities in custom getters.
	 * Using the factory directly would erroneously create duplicate as metadata would not be set.
	 *
	 * @sealed
	 */
	protected async create(parameters: I & ModelMetadataInterface): Promise<M>
	{
		const model: M = await this.factory.createFromRepositoryData(parameters);

		BaseRepository.SetMetadata(model, parameters);

		return model;
	}
}

export { BaseRepository };
