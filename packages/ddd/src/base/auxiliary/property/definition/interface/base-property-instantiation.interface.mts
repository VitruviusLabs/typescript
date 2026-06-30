import type { BasePropertyDefinition } from "../../../property-definition/base-property-definition.mjs";

interface BasePropertyInstantiationInterface<T, PD extends BasePropertyDefinition<T>>
{
	definition: PD;
	value: T;
	existing: boolean;
}

export type { BasePropertyInstantiationInterface };
