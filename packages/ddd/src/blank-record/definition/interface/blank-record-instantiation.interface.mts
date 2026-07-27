import type { UUID } from "node:crypto";
import type { BlankRecord } from "../../blank-record.mjs";
import type { MetaRecord } from "../../../base/primary/meta-record.mjs";
import type { RepositoryStatusProperty } from "../../properties/repository-status/repository-status-property.mjs";
import type { ImmutableProperty } from "../../../base/auxiliary/property/immutable-property.mjs";
import type { RepositoryDateProperty } from "../../properties/repository-date/repository-date-property.mjs";

interface BlankRecordInstantiationInterface<M extends BlankRecord<M>>
{
	metaRecord: MetaRecord<M>;
	status: RepositoryStatusProperty;
	uuid: ImmutableProperty<UUID>;
	registrationDate: RepositoryDateProperty;
	lastUpdateDate: RepositoryDateProperty;
}

export type { BlankRecordInstantiationInterface };
