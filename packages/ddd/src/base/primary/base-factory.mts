import type { BaseRecordConstructorType } from "./definition/type/base-record-constructor.type.mjs";
import type { BaseRecord } from "./base-record.mjs";

abstract class BaseFactory<M extends BaseRecord, I extends object>
{
	protected readonly recordConstructor: BaseRecordConstructorType<M, I>;

	public constructor(record_constructor: BaseRecordConstructorType<M, I>)
	{
		this.recordConstructor = record_constructor;
	}

	// eslint-disable-next-line @ts/require-await
	public async create(parameters: I): Promise<M>
	{
		const instance: M = new this.recordConstructor(parameters);

		return instance;
	}
}

export { BaseFactory };
