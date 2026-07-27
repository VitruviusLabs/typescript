import type { RepositoryRecord } from "../../base/primary/repository-record.mjs";
import { NullableLazyReference } from "./nullable-lazy-reference.mjs";

abstract class LazyReference<T extends RepositoryRecord> extends NullableLazyReference<T>
{
	protected readonly uuid: string;
	protected cacheable: boolean;
	protected cachedRecord: T | undefined;

	public constructor(uuid: string)
	{
		super();

		this.uuid = uuid;
		this.cacheable = true;
		this.cachedRecord = undefined;
	}

	protected abstract fetchRecord(): Promise<T>;

	public getUUID(): string
	{
		return this.uuid;
	}

	public async getRecord(): Promise<T>
	{
		if (this.cachedRecord !== undefined)
		{
			return this.cachedRecord;
		}

		const record: T = await this.fetchRecord();

		if (this.cacheable)
		{
			this.cachedRecord = record;
		}

		return record;
	}

	public enableCaching(): void
	{
		this.cacheable = true;
	}

	public disableCaching(): void
	{
		this.cacheable = false;
	}

	public clearCachedRecord(): void
	{
		this.cachedRecord = undefined;
	}
}

export { LazyReference };
