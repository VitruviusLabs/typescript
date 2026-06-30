import type { BaseTypeDefinition } from "../../../base/auxiliary/type-definition/base-type-definition.mjs";
import { BasePropertyDefinition } from "../../../base/auxiliary/property-definition/base-property-definition.mjs";

class RepositoryDatePropertyDefinition extends BasePropertyDefinition<Date | null>
{
	public constructor(identifier: string, type_definition: BaseTypeDefinition<Date | null>)
	{
		super({
			identifier: identifier,
			typeDefinition: type_definition,
		});
	}
}

export { RepositoryDatePropertyDefinition };
