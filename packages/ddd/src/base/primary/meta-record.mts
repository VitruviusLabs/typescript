import type { MetaPropertyType } from "../auxiliary/meta-property/definition/type/meta-property.type.mjs";
import type { RepositoryRecord } from "./repository-record.mjs";
import type { Factory } from "./factory.mjs";
import type { ReadRepository } from "./read-repository.mjs";
import type { WriteRepository } from "./write-repository.mjs";

abstract class MetaRecord<M extends RepositoryRecord>
{
	public abstract getMetaProperties(): Array<MetaPropertyType>;
	public abstract getFactory<I extends never>(): Factory<M, I>;
	public abstract getReadRepository<I extends never>(): ReadRepository<M, I>;
	public abstract getWriteRepository(): WriteRepository<M>;
}

export { MetaRecord };
