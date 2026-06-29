import { type Nullable, isNullable } from "@vitruvius-labs/ts-predicate";
import type { BaseRecord } from "./base-record.mjs";

abstract class BaseReadRepository<M extends BaseRecord, T extends object>
{
	protected abstract create(data: T): Promise<M>;

	protected async createOptional(data: Nullable<T>): Promise<M | undefined>
	{
		if (isNullable(data))
		{
			return undefined;
		}

		const instance: M = await this.create(data);

		return instance;
	}

	protected async createMany(data: Array<T>): Promise<Array<M>>
	{
		const instances: Array<M> = [];

		for (const item of data)
		{
			const instance: M = await this.create(item);

			instances.push(instance);
		}

		return instances;
	}
}

export { BaseReadRepository };
