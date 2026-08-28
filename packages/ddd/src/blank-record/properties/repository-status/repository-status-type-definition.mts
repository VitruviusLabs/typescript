import { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { EnumTypeDefinition } from "../../../predefined-type/enum/enum-type-definition.mjs";

class RepositoryStatusTypeDefinition extends EnumTypeDefinition<RepositoryStatusEnum>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public getValues(): ReadonlyArray<RepositoryStatusEnum>
	{
		return [
			RepositoryStatusEnum.NEW,
			RepositoryStatusEnum.SAVED,
			RepositoryStatusEnum.ARCHIVED,
			RepositoryStatusEnum.DESTROYED,
		];
	}
}

export { RepositoryStatusTypeDefinition };
