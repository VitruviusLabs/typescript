import type { RepositoryRecord } from "../../repository-record.mjs";

type RecordConstructorType<M extends RepositoryRecord = RepositoryRecord, I extends object = object> = new (parameters: I) => M;

export type { RecordConstructorType };
