import type { UUID } from "node:crypto";
import type { ImmutableProperty } from "../../../../../base/auxiliary/property/immutable-property.mjs";
import type { UUIDv4PropertyDefinition } from "../../uuid-v4-property-definition.mjs";

type UUIDv4PropertyType = ImmutableProperty<UUID, UUIDv4PropertyDefinition>;

export type { UUIDv4PropertyType };
