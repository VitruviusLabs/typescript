import type { TypeDefinition } from "../../../type-definition/type-definition.mjs";

interface PropertyDefinitionInstantiationInterface<T, TD extends TypeDefinition<T>>
{
	identifier: string;
	typeDefinition: TD;
}

export type { PropertyDefinitionInstantiationInterface };
