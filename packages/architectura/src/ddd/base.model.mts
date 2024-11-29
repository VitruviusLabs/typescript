import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import { randomUUID } from "node:crypto";
import { ModelRepositoryStatusEnum } from "./definition/enum/model-repository-status.enum.mjs";
import type { BaseRepository } from "./base.repository.mjs";
import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";

/**
 * Base model for all entities
**/
abstract class BaseModel
{
	protected readonly id: bigint | undefined;
	protected readonly uuid: string;
	protected readonly createdAt: Date | undefined;
	protected readonly updatedAt: Date | undefined;
	protected readonly deletedAt: Date | undefined;
	protected readonly repositoryStatus: ModelRepositoryStatusEnum;

	/**
	 * Create a new model
	**/
	public constructor(parameters: BaseModelInstantiationInterface)
	{
		this.uuid = parameters.uuid ?? randomUUID();
		this.id = undefined;
		this.createdAt = undefined;
		this.updatedAt = undefined;
		this.deletedAt = undefined;
		this.repositoryStatus = ModelRepositoryStatusEnum.NEW;
	}

	protected abstract getSelfRepository(): BaseRepository<BaseModel, ConstructorOf<BaseModel>>;

	/**
	 * Get the repository status
	**/
	public getRepositoryStatus(): ModelRepositoryStatusEnum
	{
		return this.repositoryStatus;
	}

	/**
	 * Check if the entity has an id, meaning it is saved or soft-deleted
	**/
	public hasId(): boolean
	{
		return this.id !== undefined;
	}

	/**
	 * Get the id
	 *
	 * @throws if the entity is new or destroyed
	**/
	public getId(): bigint
	{
		if (this.id === undefined)
		{
			throw new Error("You must save this entity for it to have an id.");
		}

		return this.id;
	}

	/**
	 * Get the UUID
	**/
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * Get the creation date
	 *
	 * @throws if the entity is new or destroyed
	**/
	public getCreatedAt(): Date
	{
		if (this.createdAt === undefined)
		{
			throw new Error("You must save this entity for it to have a creation date.");
		}

		return this.createdAt;
	}

	/**
	 * Get the update date
	 *
	 * @throws if the entity is new or destroyed
	**/
	public getUpdatedAt(): Date
	{
		if (this.updatedAt === undefined)
		{
			throw new Error("You must save this entity for it to have an update date.");
		}

		return this.updatedAt;
	}

	/**
	 * Get the deletion date
	 *
	 * @remarks
	 * Set by soft deletion.
	 *
	 * @throws if the entity is new or destroyed
	**/
	public getDeletedAt(): Date | undefined
	{
		if (this.id === undefined)
		{
			throw new Error("You must save this entity for it to maybe have a deletion date.");
		}

		return this.deletedAt;
	}

	/**
	 * Save the entity
	 *
	 * @throws if the entity is deleted or destroyed
	**/
	public async save(): Promise<void>
	{
		await this.getSelfRepository().saveModel(this);
	}

	/**
	 * Restore the soft-deleted entity
	 *
	 * @throws if the entity is not soft-deleted
	**/
	public async restore(): Promise<void>
	{
		await this.getSelfRepository().restoreModel(this);
	}

	/**
	 * Soft delete the entity
	 *
	 * @throws if the entity is new or destroyed
	**/
	public async delete(): Promise<void>
	{
		await this.getSelfRepository().deleteModel(this);
	}

	/**
	 * Hard delete the entity
	 *
	 * @throws if the entity is new or destroyed
	**/
	public async destroy(): Promise<void>
	{
		await this.getSelfRepository().destroyModel(this);
	}
}

export { BaseModel };
