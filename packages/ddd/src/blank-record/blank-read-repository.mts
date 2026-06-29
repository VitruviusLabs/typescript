import { type Nullable, isNullable } from "@vitruvius-labs/ts-predicate";
import type { BlankRecord } from "./blank-record.mjs";
import { BaseReadRepository } from "../base/primary/base-read-repository.mjs";

abstract class BlankReadRepository<M extends BlankRecord<M>, T extends object> extends BaseReadRepository<M, T>
{
	protected abstract fetchByUUID(uuid: string): Promise<Nullable<T>>;

	public async findByUUID(uuid: string): Promise<M | undefined>
	{
		const result: Nullable<T> = await this.fetchByUUID(uuid);

		if (isNullable(result))
		{
			return undefined;
		}

		const instance: M = await this.create(result);

		return instance;
	}

	public async getByUUID(uuid: string): Promise<M>
	{
		const result: Nullable<T> = await this.fetchByUUID(uuid);

		if (isNullable(result))
		{
			throw new Error(`Entity with UUID ${uuid} not found.`);
		}

		const instance: M = await this.create(result);

		return instance;
	}
}

export { BlankReadRepository };
