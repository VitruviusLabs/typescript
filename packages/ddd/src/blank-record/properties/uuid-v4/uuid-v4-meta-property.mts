import { type UUID, randomUUID } from "node:crypto";
import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import type { TypeDefinition } from "../../../base/auxiliary/type-definition/type-definition.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { ImmutableProperty } from "../../../base/auxiliary/property/immutable-property.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { UUIDv4TypeDefinition } from "../../../predefined-type/uuid-v4/uuid-v4-type-definition.mjs";
import { PropertyDefinition } from "../../../base/auxiliary/property-definition/property-definition.mjs";

/* eslint-disable @style/padding-line-between-statements */
type T = UUID;
type TD = TypeDefinition<T>;
type PD = PropertyDefinition<T, TD>;
type P = ImmutableProperty<T, TD, PD>;
/* eslint-enable @style/padding-line-between-statements */

class UUIDv4MetaProperty extends PredefinedMetaProperty<T, TD, PD, P>
{
	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getTypeDefinition(): Promise<TD>
	{
		return new UUIDv4TypeDefinition();
	}

	public async getPropertyDefinition(): Promise<PD>
	{
		return new PropertyDefinition({
			identifier: BlankRecordPropertyEnum.UUID,
			typeDefinition: await this.getTypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<T>): P
	{
		return new ImmutableProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<T>
	{
		return randomUUID();
	}
}

export { UUIDv4MetaProperty };
