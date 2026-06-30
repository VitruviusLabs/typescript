import type { BaseRecord } from "./base-record.mjs";

abstract class BaseWriteRepository<M extends BaseRecord>
{
	public abstract saveRecord(instance: M): Promise<void>;
}

export { BaseWriteRepository };
