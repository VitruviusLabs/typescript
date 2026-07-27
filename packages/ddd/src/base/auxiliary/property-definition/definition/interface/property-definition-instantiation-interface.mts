import type { TypeDefinition } from "../../../type-definition/type-definition.mjs";

interface PropertyDefinitionInstantiationInterface<T>
{
	identifier: string;
	typeDefinition: TypeDefinition<T>;
}

export type { PropertyDefinitionInstantiationInterface };
