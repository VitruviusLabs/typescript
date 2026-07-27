import type { PropertyDefinition } from "../property-definition/property-definition.mjs";
import type { Property } from "../property/property.mjs";
import { MetaProperty } from "./meta-property.mjs";

abstract class PredefinedMetaProperty<T, PD extends PropertyDefinition<T> = PropertyDefinition<T>, P extends Property<T, PD> = Property<T, PD>> extends MetaProperty<T, PD, P>
{
	protected abstract getInitialValue(): Promise<T>;

	public async createPredefinedProperty(): Promise<P>
	{
		const definition: PD = await this.getPropertyDefinition();

		const property: P = this.createProperty({
			definition: definition,
			value: await this.getInitialValue(),
			existing: false,
		});

		return property;
	}
}

export { PredefinedMetaProperty };
