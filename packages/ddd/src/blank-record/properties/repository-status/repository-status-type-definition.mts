import type { RepositoryStatusEnum } from "./definition/enum/repository-status.enum.mjs";
import { RequiredTypeDefinition } from "../../../predefined-type/required/required-type-definition.mjs";
import { assertRepositoryStatusEnum } from "./predicate/assert-repository-status-enum.mjs";

class RepositoryStatusTypeDefinition extends RequiredTypeDefinition<RepositoryStatusEnum>
{
	// eslint-disable-next-line @ts/class-methods-use-this
	public assertType(value: unknown): asserts value is RepositoryStatusEnum
	{
		assertRepositoryStatusEnum(value);
	}
}

export { RepositoryStatusTypeDefinition };
