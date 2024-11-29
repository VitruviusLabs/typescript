import { ModelRepositoryStatusEnum } from "../../src/_index.mjs";
import type { MockDummyType } from "./definition/type/mock-dummy-type.mjs";

function getDefaultDummyProperties(status: ModelRepositoryStatusEnum = ModelRepositoryStatusEnum.SAVED): Required<MockDummyType>
{
	switch (status)
	{
		case ModelRepositoryStatusEnum.NEW:
			return {
				repositoryStatus: ModelRepositoryStatusEnum.NEW,
				uuid: "00000000-0000-0000-0000-000000000000",
				id: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				deletedAt: undefined,
				value: 0,
			};

		case ModelRepositoryStatusEnum.SAVED:
			return {
				repositoryStatus: ModelRepositoryStatusEnum.SAVED,
				uuid: "00000000-0000-0000-0000-000000000000",
				id: 1n,
				createdAt: new Date(0),
				updatedAt: new Date(1),
				deletedAt: null,
				value: 0,
			};

		case ModelRepositoryStatusEnum.DELETED:
			return {
				repositoryStatus: ModelRepositoryStatusEnum.SAVED,
				uuid: "00000000-0000-0000-0000-000000000000",
				id: 1n,
				createdAt: new Date(0),
				updatedAt: new Date(1),
				deletedAt: new Date(1),
				value: 0,
			};

		case ModelRepositoryStatusEnum.DESTROYED:
			return {
				repositoryStatus: ModelRepositoryStatusEnum.DESTROYED,
				uuid: "00000000-0000-0000-0000-000000000000",
				id: undefined,
				createdAt: undefined,
				updatedAt: undefined,
				deletedAt: undefined,
				value: 0,
			};
	}
}

export { getDefaultDummyProperties };
