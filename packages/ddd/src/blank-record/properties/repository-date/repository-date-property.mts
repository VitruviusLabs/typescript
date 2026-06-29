import { BaseProperty } from "../../../base/auxiliary/property/base-property.mjs";
import type { RepositoryDatePropertyDefinition } from "./repository-date-property-definition.mjs";

class RepositoryDateProperty extends BaseProperty<Date | null, RepositoryDatePropertyDefinition>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public override isMutable(): false
	{
		return false;
	}

	public override setValue(): never
	{
		throw new Error(`Property "${this.getDefinition().getIdentifier()}" cannot be mutated directly.`);
	}

	public async setRepositoryValue(value: Date): Promise<void>
	{
		await super.setValue(value);

		this.overwritePreviousValue();
	}
}

export { RepositoryDateProperty };
