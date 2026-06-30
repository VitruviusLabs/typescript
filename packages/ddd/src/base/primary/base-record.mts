import { isInstanceOf } from "@vitruvius-labs/ts-predicate";
import type { BasePropertyType } from "../auxiliary/property/definition/type/base-property.type.mjs";
import { BaseProperty } from "../auxiliary/property/base-property.mjs";

abstract class BaseRecord
{
	public abstract save(): Promise<void>;

	// eslint-disable-next-line @ts/class-methods-use-this, @ts/no-empty-function
	public async verify(): Promise<void> {}

	public getProperty(identifier: string): BasePropertyType
	{
		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, BaseProperty) && member.getDefinition().getIdentifier() === identifier)
			{
				return member;
			}
		}

		throw new Error(`No property with identifier "${identifier}" found.`);
	}

	public getAllProperties(): Array<BasePropertyType>
	{
		const properties: Array<BasePropertyType> = [];

		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, BaseProperty))
			{
				properties.push(member);
			}
		}

		return properties;
	}

	public * properties(): Generator<BasePropertyType>
	{
		for (const member of Object.values(this))
		{
			if (isInstanceOf(member, BaseProperty))
			{
				yield member;
			}
		}
	}
}

export { BaseRecord };
