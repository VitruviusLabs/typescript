import { isNumber, isString } from "@vitruvius-labs/ts-predicate";
import type { PropertyInstantiationInterface } from "../../../base/auxiliary/property/definition/interface/property-instantiation.interface.mjs";
import type { TypeDefinition } from "../../../base/auxiliary/type-definition/type-definition.mjs";
import { RepositoryDatePropertyDefinition } from "./repository-date-property-definition.mjs";
import { PredefinedMetaProperty } from "../../../base/auxiliary/meta-property/predefined-meta-property.mjs";
import { RepositoryDateProperty } from "./repository-date-property.mjs";
import { NullableTypeDefinition } from "../../../predefined-type/nullable/nullable-type-definition.mjs";
import { DateTypeDefinition } from "../../../predefined-type/date/date-type-definition.mjs";

abstract class RepositoryDateMetaProperty extends PredefinedMetaProperty<Date | null, RepositoryDatePropertyDefinition, RepositoryDateProperty>
{
	protected abstract getIdentifier(): string;

	public override async normalize(value: unknown, type_definition: TypeDefinition<Date | null>): Promise<Date | null>
	{
		if (isNumber(value) || isString(value))
		{
			return new Date(value);
		}

		return await super.normalize(value, type_definition);
	}

	// eslint-disable-next-line @ts/require-await
	public async getPropertyDefinition(): Promise<RepositoryDatePropertyDefinition>
	{
		const type_definition: TypeDefinition<Date | null> = new NullableTypeDefinition(new DateTypeDefinition());

		return new RepositoryDatePropertyDefinition({
			identifier: this.getIdentifier(),
			typeDefinition: type_definition,
		});
	}

	// eslint-disable-next-line @ts/class-methods-use-this
	protected createProperty(parameters: PropertyInstantiationInterface<Date | null, RepositoryDatePropertyDefinition>): RepositoryDateProperty
	{
		return new RepositoryDateProperty(parameters);
	}

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/require-await
	protected async getInitialValue(): Promise<Date | null>
	{
		return null;
	}
}

export { RepositoryDateMetaProperty };
