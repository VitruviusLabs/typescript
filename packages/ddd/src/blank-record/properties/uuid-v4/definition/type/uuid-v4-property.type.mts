import type { UUID } from "node:crypto";
import type { BaseImmutableProperty } from "../../../../../base/auxiliary/property/base-immutable-property.mjs";
import type { UUIDv4PropertyDefinition } from "../../uuid-v4-property-definition.mjs";

type UUIDv4PropertyType = BaseImmutableProperty<UUID, UUIDv4PropertyDefinition>;

export type { UUIDv4PropertyType };
