import { randomUUID } from "node:crypto";

import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";

abstract class BaseModel
{
	protected readonly id: bigint | undefined;
	protected readonly uuid: string;
	protected readonly createdAt: Date | undefined;
	protected readonly updatedAt: Date | undefined;
	protected readonly deletedAt: Date | undefined;

	public constructor(parameters: BaseModelInstantiationInterface)
	{
		this.uuid = parameters.uuid ?? randomUUID();
	}

	public abstract save(): Promise<void>;
	public abstract delete(): Promise<void>;

	public hasId(): boolean
	{
		return this.id !== undefined;
	}

	public getId(): bigint
	{
		if (this.id === undefined)
		{
			throw new Error("You must save this entity for it to have an id.");
		}

		return this.id;
	}

	public getUUID(): string
	{
		return this.uuid;
	}

	public getCreatedAt(): Date
	{
		if (this.createdAt === undefined)
		{
			throw new Error("You must save this entity for it to have a creation date.");
		}

		return this.createdAt;
	}

	public getUpdatedAt(): Date
	{
		if (this.updatedAt === undefined)
		{
			throw new Error("You must save this entity for it to have an update date.");
		}

		return this.updatedAt;
	}

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
