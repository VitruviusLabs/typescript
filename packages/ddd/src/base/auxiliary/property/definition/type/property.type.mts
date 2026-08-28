import type { Property } from "../../property.mjs";
import type { TypeDefinitionType } from "../../../type-definition/definition/type/type-definition.type.mjs";
import type { PropertyDefinitionType } from "../../../property-definition/definition/type/property-definition.type.mjs";

type PropertyType = Property<unknown, TypeDefinitionType, PropertyDefinitionType>;

export type { PropertyType };
