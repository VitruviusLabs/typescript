import type { Property } from "../../../../../base/auxiliary/property/property.mjs";
import type { RepositoryStatusEnum } from "../enum/repository-status.enum.mjs";
import type { RepositoryStatusPropertyDefinition } from "../../repository-status-property-definition.mjs";

type RepositoryStatusPropertyType = Property<RepositoryStatusEnum, RepositoryStatusPropertyDefinition>;

export type { RepositoryStatusPropertyType };
