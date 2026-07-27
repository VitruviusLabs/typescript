import type { PropertyDefinition } from "../property-definition/property-definition.mjs";
import type { Property } from "../property/property.mjs";
import type { PropertyInstantiationInterface } from "../property/definition/interface/property-instantiation.interface.mjs";
import type { TypeDefinition } from "../type-definition/type-definition.mjs";

abstract class MetaProperty<
	T,
	TD extends TypeDefinition<T> = TypeDefinition<T>,
	PD extends PropertyDefinition<T, TD> = PropertyDefinition<T, TD>,
	P extends Property<T, TD, PD> = Property<T, TD, PD>
>
{
	public abstract getTypeDefinition(): Promise<TD>;

	public abstract getPropertyDefinition(): Promise<PD>;

	protected abstract createProperty(parameters: PropertyInstantiationInterface<T, TD, PD>): P;

	public async createNewProperty(value: T): Promise<P>
	{
		const definition: PD = await this.getPropertyDefinition();

		const property: P = this.createProperty({
			definition: definition,
			value: value,
			existing: false,
		});

		return property;
	}

	public async createExistingProperty(value: unknown): Promise<P>
	{
		const property_definition: PD = await this.getPropertyDefinition();

		const type_definition: TD = property_definition.getTypeDefinition();

		const normalized_value: T = await this.normalize(value, type_definition);

		await type_definition.verify(normalized_value);

		const property: P = this.createProperty({
			definition: property_definition,
			value: normalized_value,
			existing: true,
		});

		return property;
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async normalize(value: unknown, type_definition: TD): Promise<T>
	{
		type_definition.assertType(value);

		return value;
	}
}

export { MetaProperty };
