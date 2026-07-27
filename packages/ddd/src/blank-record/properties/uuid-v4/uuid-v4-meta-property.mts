import { type UUID, randomUUID } from "node:crypto";
import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { ImmutableProperty } from "../../../base/auxiliary/property/immutable-property.mjs";
import { UUIDv4PropertyDefinition } from "./uuid-v4-property-definition.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { UUIDv4TypeDefinition } from "../../../predefined-type/uuid-v4/uuid-v4-type-definition.mjs";

class UUIDv4MetaProperty extends PredefinedMetaProperty<UUID, UUIDv4PropertyDefinition, ImmutableProperty<UUID, UUIDv4PropertyDefinition>>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getPropertyDefinition(): Promise<UUIDv4PropertyDefinition>
	{
		return new UUIDv4PropertyDefinition({
			identifier: BlankRecordPropertyEnum.UUID,
			typeDefinition: new UUIDv4TypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<UUID, UUIDv4PropertyDefinition>): ImmutableProperty<UUID, UUIDv4PropertyDefinition>
	{
		return new ImmutableProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<UUID>
	{
		return randomUUID();
	}
}

export { UUIDv4MetaProperty };
