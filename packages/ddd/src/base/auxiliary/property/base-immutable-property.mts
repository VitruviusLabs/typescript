import type { BasePropertyDefinition } from "../property-definition/base-property-definition.mjs";
import type { BasePropertyInstantiationInterface } from "./definition/interface/base-property-instantiation.interface.mjs";
import { BaseProperty } from "./base-property.mjs";

class BaseImmutableProperty<T, PD extends BasePropertyDefinition<T>> extends BaseProperty<T, PD>
{
	public constructor(parameters: BasePropertyInstantiationInterface<T, PD>)
	{
		super(parameters);

		this.disableMutability();
	}

	public override setValue(): never
	{
		throw new Error(`Property "${this.getDefinition().getIdentifier()}" is immutable.`);
	}
}

export { BaseImmutableProperty };
