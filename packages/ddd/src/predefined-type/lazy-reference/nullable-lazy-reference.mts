import type { BaseRecord } from "../../base/primary/base-record.mjs";

abstract class NullableLazyReference<T extends BaseRecord>
{
	public abstract getUUID(): string | null;
	public abstract getRecord(): Promise<T | null>;
	public abstract enableCaching(): void;
	public abstract disableCaching(): void;
	public abstract clearCachedRecord(): void;
}

export { NullableLazyReference };
