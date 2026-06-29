import { NoValue } from "@vitruvius-labs/ts-predicate";
import type { BasePropertyDefinition } from "../property-definition/base-property-definition.mjs";
import type { BasePropertyInstantiationInterface } from "./definition/interface/base-property-instantiation.interface.mjs";

class BaseProperty<T, PD extends BasePropertyDefinition<T>>
{
	private readonly definition: PD;
	private mutability: boolean;
	private value: T;
	private previousValue: T | typeof NoValue;

	public constructor(parameters: BasePropertyInstantiationInterface<T, PD>)
	{
		this.definition = parameters.definition;
		this.mutability = true;
		this.value = parameters.value;
		this.previousValue = parameters.existing ? parameters.value : NoValue;
	}

	public getDefinition(): PD
	{
		return this.definition;
	}

	// eslint-disable-next-line @ts/require-await
	public async getValue(): Promise<T>
	{
		return this.value;
	}

	public isMutable(): boolean
	{
		return this.mutability;
	}

	public disableMutability(): void
	{
		this.mutability = false;
	}

	public assertMutability(): void
	{
		if (!this.mutability)
		{
			throw new Error(`Property "${this.definition.getIdentifier()}" is immutable.`);
		}
	}

	public async setValue(value: T): Promise<void>
	{
		this.assertMutability();

		await this.definition.verify(value, this.value);

		this.value = value;
	}

	public isMutated(): boolean
	{
		if (this.previousValue === NoValue)
		{
			return true;
		}

		const is_equal: boolean = this.definition.getTypeDefinition().isEqual(this.previousValue, this.value);

		return !is_equal;
	}

	public getPreviousValue(): T | typeof NoValue
	{
		return this.previousValue;
	}

	public overwritePreviousValue(): void
	{
		this.previousValue = this.value;
	}
}

export { BaseProperty };
