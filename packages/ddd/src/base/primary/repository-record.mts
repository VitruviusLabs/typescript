import { isInstanceOf } from "@vitruvius-labs/ts-predicate";
import type { PropertyType } from "../auxiliary/property/definition/type/property.type.mjs";
import { Property } from "../auxiliary/property/property.mjs";

abstract class RepositoryRecord
{
	public abstract save(): Promise<void>;

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-empty-function
	public async verify(): Promise<void> {}

	public getProperty(identifier: string): PropertyType
	{
		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, Property) && member.getDefinition().getIdentifier() === identifier)
			{
				return member;
			}
		}

		throw new Error(`No property with identifier "${identifier}" found.`);
	}

	public getAllProperties(): Array<PropertyType>
	{
		const properties: Array<PropertyType> = [];

		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, Property))
			{
				properties.push(member);
			}
		}

		return properties;
	}

	public * properties(): Generator<PropertyType>
	{
		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, Property))
			{
				yield member;
			}
		}
	}
}

export { RepositoryRecord };
