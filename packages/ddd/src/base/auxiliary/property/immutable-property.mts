import type { TypeDefinition } from "../type-definition/type-definition.mjs";
import type { PropertyDefinition } from "../property-definition/property-definition.mjs";
import type { PropertyInstantiationInterface } from "./definition/interface/property-instantiation.interface.mjs";
import { Property } from "./property.mjs";

class ImmutableProperty<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>,
	PD extends PropertyDefinition<T, TD> = PropertyDefinition<T, TD>
> extends Property<T, TD, PD>
{
	public constructor(parameters: PropertyInstantiationInterface<T, TD, PD>)
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
