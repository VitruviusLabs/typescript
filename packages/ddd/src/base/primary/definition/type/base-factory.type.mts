import type { BaseFactory } from "../../base-factory.mjs";
import type { BaseRecord } from "../../base-record.mjs";

type BaseFactoryType<M extends BaseRecord = BaseRecord> = BaseFactory<M, object>;

export type { BaseFactoryType };
