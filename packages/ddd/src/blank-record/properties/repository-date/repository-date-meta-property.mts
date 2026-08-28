import { isNumber, isString } from "@vitruvius-labs/ts-predicate";
import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import type { TypeDefinition } from "../../../base/auxiliary/type-definition/type-definition.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { RepositoryDateProperty } from "./repository-date-property.mjs";
import { NullableTypeDefinition } from "../../../predefined-type/nullable/nullable-type-definition.mjs";
import { DateTypeDefinition } from "../../../predefined-type/date/date-type-definition.mjs";
import { PropertyDefinition } from "../../../base/auxiliary/property-definition/property-definition.mjs";

/* eslint-disable @style/padding-line-between-statements */
type T = Date | null;
type TD = TypeDefinition<Date | null>;
type PD = PropertyDefinition<Date | null>;
type P = RepositoryDateProperty;
/* eslint-enable @style/padding-line-between-statements */

abstract class RepositoryDateMetaProperty extends PredefinedMetaProperty<T, TD, PD, P>
{
	protected abstract getIdentifier(): string;

	public override async normalize(value: unknown, type_definition: TD): Promise<T>
	{
		if (isNumber(value) || isString(value))
		{
			return new Date(value);
		}

		return await super.normalize(value, type_definition);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	public async getTypeDefinition(): Promise<TD>
	{
		return new NullableTypeDefinition(new DateTypeDefinition());
	}

	public async getPropertyDefinition(): Promise<PD>
	{
		return new PropertyDefinition({
			identifier: this.getIdentifier(),
			typeDefinition: await this.getTypeDefinition(),
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<T>): P
	{
		return new RepositoryDateProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<T>
	{
		return null;
	}
}

export { RepositoryDateMetaProperty };
