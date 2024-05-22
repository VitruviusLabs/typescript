import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import { randomUUID } from "node:crypto";

/**
 * Base model for all entities
 */
abstract class BaseModel
{
	protected readonly id: bigint | undefined;
	protected readonly uuid: string;
	protected readonly createdAt: Date | undefined;
	protected readonly updatedAt: Date | undefined;
	protected readonly deletedAt: Date | undefined;

	/**
	 * Create a new model
	 */
	public constructor(parameters: BaseModelInstantiationInterface)
	{
		this.uuid = parameters.uuid ?? randomUUID();
	}

	/**
	 * Save the entity
	 *
	 * @remarks
	 * Usually retrieve the corresponding repository from the domain then save the entity.
	 */
	public abstract save(): Promise<void>;

	/**
	 * Delete the entity
	 *
	 * @remarks
	 * Usually retrieve the corresponding repository from the domain then delete the entity.
	 */
	public abstract delete(): Promise<void>;

	/**
	 * Check if the entity has an id, meaning it has been saved
	 */
	public hasId(): boolean
	{
		return this.id !== undefined;
	}

	/**
	 * Get the id
	 *
	 * @throws if the entity has not been saved
	 */
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
	 */
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * Get the creation date
	 *
	 * @throws if the entity has not been saved
	 */
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
	 * @throws if the entity has not been saved
	 */
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
	 * This is only available if you use soft deletion.
	 *
	 * @throws if the entity has not been saved
	 */
	public getDeletedAt(): Date | undefined
	{
		if (this.id === undefined)
		{
			throw new Error("You must save this entity for it to maybe have a deletion date.");
		}

		return this.deletedAt;
	}
}

export { BaseModel };
