import type { Factory } from "../../factory.mjs";
import type { RepositoryRecord } from "../../repository-record.mjs";

type FactoryType<M extends RepositoryRecord = RepositoryRecord> = Factory<M, object>;

export type { FactoryType };
