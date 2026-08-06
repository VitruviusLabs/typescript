import type { TypeDefinition } from "../base/auxiliary/type-definition/type-definition.mjs";
import type { PropertyInstantiationInterface } from "../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import { MetaProperty } from "../base/auxiliary/meta-property/meta-property.mjs";
import { PropertyDefinition } from "../base/auxiliary/property-definition/property-definition.mjs";
import { Property } from "../base/auxiliary/property/property.mjs";

abstract class GenericMetaProperty<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>
> extends MetaProperty<
	T,
	TD,
	PropertyDefinition<T, TD>,
	Property<T, TD, PropertyDefinition<T, TD>>
>
{
	protected abstract getIdentifier(): string;

	public async getPropertyDefinition(): Promise<PropertyDefinition<T, TD>>
	{
		return new PropertyDefinition({
			identifier: this.getIdentifier(),
			typeDefinition: await this.getTypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<T, TD>): Property<T, TD, PropertyDefinition<T, TD>>
	{
		return new Property(parameters);
	}
}

export { GenericMetaProperty };
