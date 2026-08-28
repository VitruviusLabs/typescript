import type { TypeDefinition } from "../base/auxiliary/type-definition/type-definition.mjs";
import type { PropertyInstantiationInterface } from "../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import { MetaProperty } from "../base/auxiliary/meta-property/meta-property.mjs";
import { PropertyDefinition } from "../base/auxiliary/property-definition/property-definition.mjs";
import { ImmutableProperty } from "../base/auxiliary/property/immutable-property.mjs";

abstract class GenericImmutableMetaProperty<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>
> extends MetaProperty<
	T,
	TD,
	PropertyDefinition<T, TD>,
	ImmutableProperty<T, TD, PropertyDefinition<T, TD>>
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
	protected createProperty(parameters: PropertyInstantiationInterface<T, TD>): ImmutableProperty<T, TD, PropertyDefinition<T, TD>>
	{
		return new ImmutableProperty(parameters);
	}
}

export { GenericImmutableMetaProperty };
