import type { RecordConstructorType } from "./definition/type/record-constructor.type.mjs";
import type { RepositoryRecord } from "./repository-record.mjs";

abstract class Factory<M extends RepositoryRecord, I extends object>
{
	protected readonly recordConstructor: RecordConstructorType<M, I>;

	public constructor(record_constructor: RecordConstructorType<M, I>)
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

export { Factory };
