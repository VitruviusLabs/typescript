import type { BasePropertyDefinition } from "../property-definition/base-property-definition.mjs";
import type { BaseProperty } from "../property/base-property.mjs";
import { BaseMetaProperty } from "./base-meta-property.mjs";

abstract class PredefinedMetaProperty<T, PD extends BasePropertyDefinition<T>, P extends BaseProperty<T, PD> = BaseProperty<T, PD>> extends BaseMetaProperty<T, PD, P>
{
	protected abstract getInitialValue(): Promise<T>;

	public async createPredefinedProperty(): Promise<P>
	{
		// @ts-expect-error -- We have to assume this is the correct definition
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
