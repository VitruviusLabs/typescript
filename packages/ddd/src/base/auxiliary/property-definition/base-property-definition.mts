import type { NoValue } from "@vitruvius-labs/ts-predicate";
import type { BaseTypeDefinition } from "../type-definition/base-type-definition.mjs";
import type { BasePropertyDefinitionInstantiationInterface } from "./base-property-definition-instantiation-interface.mjs";

abstract class BasePropertyDefinition<T>
{
	protected readonly identifier: string;
	protected readonly typeDefinition: BaseTypeDefinition<T>;

	public constructor(parameters: BasePropertyDefinitionInstantiationInterface<T>)
	{
		this.identifier = parameters.identifier;
		this.typeDefinition = parameters.typeDefinition;
	}

	public getIdentifier(): string
	{
		return this.identifier;
	}

	public getTypeDefinition(): BaseTypeDefinition<T>
	{
		return this.typeDefinition;
	}

	// @ts-expect-error -- Parameters for overrides
	// eslint-disable-next-line @ts/no-unused-vars
	public async verify(value: T, previous_value: T | typeof NoValue): Promise<void>
	{
		await this.typeDefinition.verify(value);
	}
}

export { BasePropertyDefinition };
