import { assertEnumValue } from "@vitruvius-labs/ts-predicate";
import { RepositoryStatusEnum } from "../definition/enum/repository-status.enum.mjs";

function assertRepositoryStatusEnum(value: unknown): asserts value is RepositoryStatusEnum
{
	assertEnumValue(value, [
		RepositoryStatusEnum.NEW,
		RepositoryStatusEnum.SAVED,
		RepositoryStatusEnum.ARCHIVED,
		RepositoryStatusEnum.DESTROYED,
	]);
}

export { assertRepositoryStatusEnum };
