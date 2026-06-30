import type { UUID } from "node:crypto";
import type { RepositoryStatusEnum } from "../../properties/repository-status/definition/enum/repository-status.enum.mjs";

interface BlankRecordRecipeInterface
{
	status: RepositoryStatusEnum;
	uuid: UUID;
	registrationDate: Date | null;
	lastUpdateDate: Date | null;
}

export type { BlankRecordRecipeInterface };
