import type { BaseMetaProperty } from "../../base-meta-property.mjs";
import type { BasePropertyType } from "../../../property/definition/type/base-property.type.mjs";
import type { BasePropertyDefinitionType } from "../../../property-definition/definition/type/base-property-definition.type.mjs";

type BaseMetaPropertyType = BaseMetaProperty<unknown, BasePropertyDefinitionType, BasePropertyType>;

export type { BaseMetaPropertyType };
