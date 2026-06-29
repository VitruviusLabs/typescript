import type { BasePropertyDefinition } from "../property-definition/base-property-definition.mjs";
import type { BaseProperty } from "../property/base-property.mjs";
import type { BasePropertyInstantiationInterface } from "../property/definition/interface/base-property-instantiation.interface.mjs";
import type { BaseTypeDefinition } from "../type-definition/base-type-definition.mjs";

abstract class BaseMetaProperty<T, PD extends BasePropertyDefinition<T>, P extends BaseProperty<T, PD> = BaseProperty<T, PD>>
{
	public abstract getPropertyDefinition(): Promise<BasePropertyDefinition<T>>;

	protected abstract createProperty(parameters: BasePropertyInstantiationInterface<T, PD>): P;

	public async createNewProperty(value: T): Promise<P>
	{
		// @ts-expect-error -- We have to assume this is the correct definition
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
		// @ts-expect-error -- We have to assume this is the correct definition
		const property_definition: PD = await this.getPropertyDefinition();

		const type_definition: BaseTypeDefinition<T> = property_definition.getTypeDefinition();

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
	public async normalize(value: unknown, type_definition: BaseTypeDefinition<T>): Promise<T>
	{
		type_definition.assertType(value);

		return value;
	}
}

export { BaseMetaProperty };
