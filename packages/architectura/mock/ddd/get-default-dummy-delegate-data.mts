import { type ModelMetadataInterface, ModelRepositoryStatusEnum } from "../../src/_index.mjs";
import type { DummyDelegateDataInterface } from "./_index.mjs";

function getDefaultDummyDelegateDataInterface(status: ModelRepositoryStatusEnum = ModelRepositoryStatusEnum.SAVED): DummyDelegateDataInterface & ModelMetadataInterface
{
	switch (status)
	{
		case ModelRepositoryStatusEnum.NEW:
			throw new Error("Cannot retrieve data from the repository for a new model.");

		case ModelRepositoryStatusEnum.DESTROYED:
			throw new Error("Cannot retrieve data from the repository for a destroyed model.");

		case ModelRepositoryStatusEnum.SAVED:
			return {
				uuid: "00000000-0000-0000-0000-000000000000",
				id: 1n,
				createdAt: new Date(0),
				updatedAt: new Date(1),
				deletedAt: null,
				value: "0",
			};

		case ModelRepositoryStatusEnum.DELETED:
			return {
				uuid: "00000000-0000-0000-0000-000000000000",
				id: 1n,
				createdAt: new Date(0),
				updatedAt: new Date(1),
				deletedAt: new Date(1),
				value: "0",
			};
	}
}

export { getDefaultDummyDelegateDataInterface };
