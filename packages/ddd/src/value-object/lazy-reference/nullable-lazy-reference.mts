import type { RepositoryRecord } from "../../base/primary/repository-record.mjs";

abstract class NullableLazyReference<T extends RepositoryRecord>
{
	public abstract getUUID(): string | null;
	public abstract getRecord(): Promise<T | null>;
	public abstract enableCaching(): void;
	public abstract disableCaching(): void;
	public abstract clearCachedRecord(): void;
}

export { NullableLazyReference };
