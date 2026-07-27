import type { PropertyDefinition } from "../../../property-definition/property-definition.mjs";

interface PropertyInstantiationInterface<T, PD extends PropertyDefinition<T>>
{
	definition: PD;
	value: T;
	existing: boolean;
}

export type { PropertyInstantiationInterface };
