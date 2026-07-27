import type { MetaProperty } from "../../meta-property.mjs";
import type { TypeDefinitionType } from "../../../type-definition/definition/type/type-definition.type.mjs";
import type { PropertyDefinitionType } from "../../../property-definition/definition/type/property-definition.type.mjs";
import type { PropertyType } from "../../../property/definition/type/property.type.mjs";

type MetaPropertyType = MetaProperty<unknown, TypeDefinitionType, PropertyDefinitionType, PropertyType>;

export type { MetaPropertyType };
