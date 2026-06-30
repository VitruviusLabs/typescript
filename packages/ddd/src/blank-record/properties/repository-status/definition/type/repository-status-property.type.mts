import type { BaseProperty } from "../../../../../base/auxiliary/property/base-property.mjs";
import type { RepositoryStatusEnum } from "../enum/repository-status.enum.mjs";
import type { RepositoryStatusPropertyDefinition } from "../../repository-status-property-definition.mjs";

type RepositoryStatusPropertyType = BaseProperty<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>;

export type { RepositoryStatusPropertyType };
