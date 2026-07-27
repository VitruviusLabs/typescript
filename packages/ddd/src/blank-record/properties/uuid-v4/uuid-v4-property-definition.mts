import type { UUID } from "node:crypto";
import { PropertyDefinition } from "../../../base/auxiliary/property-definition/property-definition.mjs";

class UUIDv4PropertyDefinition extends PropertyDefinition<UUID> {}

export { UUIDv4PropertyDefinition };
