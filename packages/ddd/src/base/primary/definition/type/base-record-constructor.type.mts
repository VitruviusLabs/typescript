import type { BaseRecord } from "../../base-record.mjs";

type BaseRecordConstructorType<M extends BaseRecord = BaseRecord, I extends object = object> = new (parameters: I) => M;

export type { BaseRecordConstructorType };
