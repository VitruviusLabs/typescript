import type { NoValue } from "@vitruvius-labs/ts-predicate";
import type { TypeDefinition } from "../type-definition/type-definition.mjs";
import type { PropertyDefinitionInstantiationInterface } from "./definition/interface/property-definition-instantiation-interface.mjs";

class PropertyDefinition<T>
{
	protected readonly identifier: string;
	protected readonly typeDefinition: TypeDefinition<T>;

	public constructor(parameters: PropertyDefinitionInstantiationInterface<T>)
	{
		this.identifier = parameters.identifier;
		this.typeDefinition = parameters.typeDefinition;
	}

	public getIdentifier(): string
	{
		return this.identifier;
	}

	public getTypeDefinition(): TypeDefinition<T>
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

export { PropertyDefinition };
