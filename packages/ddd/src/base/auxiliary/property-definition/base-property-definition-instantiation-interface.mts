import type { BaseTypeDefinition } from "../type-definition/base-type-definition.mjs";

interface BasePropertyDefinitionInstantiationInterface<T>
{
	identifier: string;
	typeDefinition: BaseTypeDefinition<T>;
}

export type { BasePropertyDefinitionInstantiationInterface };
