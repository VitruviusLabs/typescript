import type { PropertyDefinition } from "../property-definition/property-definition.mjs";
import type { PropertyInstantiationInterface } from "./definition/interface/property-instantiation.interface.mjs";
import { Property } from "./property.mjs";

class ImmutableProperty<T, PD extends PropertyDefinition<T> = PropertyDefinition<T>> extends Property<T, PD>
{
	public constructor(parameters: PropertyInstantiationInterface<T, PD>)
	{
		super(parameters);

		this.disableMutability();
	}

	public override setValue(): never
	{
		throw new Error(`Property "${this.getDefinition().getIdentifier()}" is immutable.`);
	}
}

export { ImmutableProperty };
