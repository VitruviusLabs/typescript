import type { RepositoryStatusProperty } from "./properties/repository-status/repository-status-property.mjs";
import type { UUIDv4PropertyType } from "./properties/uuid-v4/definition/type/uuid-v4-property.type.mjs";
import type { RepositoryDateProperty } from "./properties/repository-date/repository-date-property.mjs";
import type { BlankRecordInstantiationInterface } from "./definition/interface/blank-record-instantiation.interface.mjs";
import { RepositoryRecord } from "../base/primary/repository-record.mjs";
import { RepositoryActionEnum } from "./properties/repository-status/definition/enum/repository-action.enum.mjs";
import type { MetaRecord } from "../base/primary/meta-record.mjs";

abstract class BlankRecord<M extends BlankRecord<M>> extends RepositoryRecord
{
	protected readonly metaRecord: MetaRecord<M>;
	protected readonly status: RepositoryStatusProperty;
	protected readonly uuid: UUIDv4PropertyType;
	protected readonly registrationDate: RepositoryDateProperty;
	protected readonly lastUpdateDate: RepositoryDateProperty;

	public constructor(parameters: BlankRecordInstantiationInterface<M>)
	{
		super();

		this.metaRecord = parameters.metaRecord;
		this.status = parameters.status;
		this.uuid = parameters.uuid;
		this.registrationDate = parameters.registrationDate;
		this.lastUpdateDate = parameters.lastUpdateDate;
	}

	public getStatus(): RepositoryStatusProperty
	{
		return this.status;
	}

	public getUUID(): UUIDv4PropertyType
	{
		return this.uuid;
	}

	public getRegistrationDate(): RepositoryDateProperty
	{
		return this.registrationDate;
	}

	public getLastUpdateDate(): RepositoryDateProperty
	{
		return this.lastUpdateDate;
	}

	public async save(): Promise<void>
	{
		// @ts-expect-error -- The concrete class should be final
		await this.metaRecord.getWriteRepository().saveRecord(this);
	}

	public async archive(): Promise<void>
	{
		await this.status.setAction(RepositoryActionEnum.ARCHIVE);

		await this.save();
	}

	public async restore(): Promise<void>
	{
		await this.status.setAction(RepositoryActionEnum.RESTORE);

		await this.save();
	}

	public async destroy(): Promise<void>
	{
		await this.status.setAction(RepositoryActionEnum.DESTROY);

		await this.save();
	}
}

export { BlankRecord };
