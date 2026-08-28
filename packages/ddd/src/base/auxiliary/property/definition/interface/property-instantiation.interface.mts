import type { TypeDefinition } from "../../../type-definition/type-definition.mjs";
import type { PropertyDefinition } from "../../../property-definition/property-definition.mjs";

interface PropertyInstantiationInterface<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>,
	PD extends PropertyDefinition<T, TD> = PropertyDefinition<T, TD>
>
{
	definition: PD;
	value: T;
	existing: boolean;
}

export type { PropertyInstantiationInterface };
