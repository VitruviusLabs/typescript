import type { UUID } from "node:crypto";
import { BasePropertyDefinition } from "../../../base/auxiliary/property-definition/base-property-definition.mjs";

class UUIDv4PropertyDefinition extends BasePropertyDefinition<UUID> {}

export { UUIDv4PropertyDefinition };
