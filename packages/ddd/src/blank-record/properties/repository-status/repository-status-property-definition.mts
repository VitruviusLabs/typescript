import type { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { BasePropertyDefinition } from "../../../base/auxiliary/property-definition/base-property-definition.mjs";
import { BlankRecordPropertyEnum } from "../../definition/enum/blank-record-property.enum.mjs";
import { RepositoryStatusTypeDefinition } from "./repository-status-type-definition.mjs";

class RepositoryStatusPropertyDefinition extends BasePropertyDefinition<RepositoryStatusEnum>
{
	public constructor()
	{
		super({
			identifier: BlankRecordPropertyEnum.REPOSITORY_STATUS,
			typeDefinition: new RepositoryStatusTypeDefinition(),
		});
	}
}

export { RepositoryStatusPropertyDefinition };
