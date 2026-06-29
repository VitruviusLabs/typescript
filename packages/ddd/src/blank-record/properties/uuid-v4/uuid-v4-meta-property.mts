import { type UUID, randomUUID } from "node:crypto";
import type { BasePropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/base-property-instantiation.interface.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { BaseImmutableProperty } from "../../../base/auxiliary/property/base-immutable-property.mjs";
import { UUIDv4PropertyDefinition } from "./uuid-v4-property-definition.mjs";

class UUIDv4MetaProperty extends PredefinedMetaProperty<UUID, UUIDv4PropertyDefinition, BaseImmutableProperty<UUID, UUIDv4PropertyDefinition>>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getPropertyDefinition(): Promise<UUIDv4PropertyDefinition>
	{
		return new UUIDv4PropertyDefinition();
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: BasePropertyInstantiationInterface<UUID, UUIDv4PropertyDefinition>): BaseImmutableProperty<UUID, UUIDv4PropertyDefinition>
	{
		return new BaseImmutableProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<UUID>
	{
		return randomUUID();
	}
}

export { UUIDv4MetaProperty };
