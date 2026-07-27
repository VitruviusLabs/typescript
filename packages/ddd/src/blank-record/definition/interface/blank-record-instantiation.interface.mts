import type { RepositoryStatusProperty } from "../../properties/repository-status/repository-status-property.mjs";
import type { UUIDv4PropertyType } from "../../properties/uuid-v4/definition/type/uuid-v4-property.type.mjs";
import type { RepositoryDateProperty } from "../../properties/repository-date/repository-date-property.mjs";
import type { BlankRecord } from "../../blank-record.mjs";
import type { MetaRecord } from "../../../base/primary/meta-record.mjs";

interface BlankRecordInstantiationInterface<M extends BlankRecord<M>>
{
	metaRecord: MetaRecord<M>;
	status: RepositoryStatusProperty;
	uuid: UUIDv4PropertyType;
	registrationDate: RepositoryDateProperty;
	lastUpdateDate: RepositoryDateProperty;
}

export type { BlankRecordInstantiationInterface };
