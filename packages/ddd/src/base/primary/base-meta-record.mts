import type { BaseMetaPropertyType } from "../auxiliary/meta-property/definition/type/base-meta-property.type.mjs";
import type { BaseRecord } from "./base-record.mjs";
import type { BaseFactory } from "./base-factory.mjs";
import type { BaseReadRepository } from "./base-read-repository.mjs";
import type { BaseWriteRepository } from "./base-write-repository.mjs";

abstract class BaseMetaRecord<M extends BaseRecord>
{
	public abstract getMetaProperties(): Array<BaseMetaPropertyType>;
	public abstract getFactory<I extends never>(): BaseFactory<M, I>;
	public abstract getReadRepository<I extends never>(): BaseReadRepository<M, I>;
	public abstract getWriteRepository(): BaseWriteRepository<M>;
}

export { BaseMetaRecord };
