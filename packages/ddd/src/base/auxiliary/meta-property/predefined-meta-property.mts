import type { PropertyDefinition } from "../property-definition/property-definition.mjs";
import type { Property } from "../property/property.mjs";
import type { TypeDefinition } from "../type-definition/type-definition.mjs";
import { MetaProperty } from "./meta-property.mjs";

abstract class PredefinedMetaProperty<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>,
	PD extends PropertyDefinition<T, TD> = PropertyDefinition<T, TD>,
	P extends Property<T, TD, PD> = Property<T, TD, PD>
> extends MetaProperty<T, TD, PD, P>
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
