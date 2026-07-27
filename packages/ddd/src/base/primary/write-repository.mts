import type { RepositoryRecord } from "./repository-record.mjs";

abstract class WriteRepository<M extends RepositoryRecord>
{
	public abstract saveRecord(instance: M): Promise<void>;
}

export { WriteRepository };
