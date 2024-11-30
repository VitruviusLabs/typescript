import type { NullableObject } from "@vitruvius-labs/ts-predicate/helper";
import type { DummyInstantiationInterface } from "../interface/dummy-instantiation.interface.mjs";
import type { ModelMetadataInterface, ModelRepositoryStatusEnum } from "../../../../src/_index.mjs";

type MockDummyType = Required<DummyInstantiationInterface & NullableObject<ModelMetadataInterface> & { persistenceInRepositoryStatus: ModelRepositoryStatusEnum }>;

export type { MockDummyType };
