import type { MetaProperty } from "../../meta-property.mjs";
import type { PropertyType } from "../../../property/definition/type/property.type.mjs";
import type { PropertyDefinitionType } from "../../../property-definition/definition/type/property-definition.type.mjs";

type MetaPropertyType = MetaProperty<unknown, PropertyDefinitionType, PropertyType>;

export type { MetaPropertyType };
