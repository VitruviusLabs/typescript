import { randomUUID } from "node:crypto";

import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";

abstract class BaseModel
{
	protected readonly id: number | undefined;
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

	public getId(): number
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

	public getCreatedAt(): Date | undefined
	{
		return this.createdAt;
	}

	public getUpdatedAt(): Date | undefined
	{
		return this.updatedAt;
	}

	public getDeletedAt(): Date | undefined
	{
		return this.deletedAt;
	}
}

export { BaseModel };
