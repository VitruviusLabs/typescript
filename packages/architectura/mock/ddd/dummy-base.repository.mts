import type { DummyModel } from "./dummy.model.mjs";
import type { NonNullableKeys } from "@vitruvius-labs/ts-predicate/helper";
import type { DummyDelegateDataInterface } from "./definition/_index.mjs";
import { BaseRepository, type ModelMetadataInterface, type RepositoryQueryNormalizedOptionsInterface } from "../../src/_index.mjs";

class DummyBaseRepository extends BaseRepository<DummyModel, typeof DummyModel, DummyDelegateDataInterface>
{
	protected async fetchByUUID(uuid: string, options: RepositoryQueryNormalizedOptionsInterface): Promise<(DummyDelegateDataInterface & ModelMetadataInterface) | undefined>
	{
		return await Promise.resolve({
			id: 1n,
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: options.includeDeleted ? new Date(1) : null,
			uuid: uuid,
			value: "0",
		});
	}

	protected async fetchById(id: bigint, options: RepositoryQueryNormalizedOptionsInterface): Promise<(DummyDelegateDataInterface & ModelMetadataInterface) | undefined>
	{
		return await Promise.resolve({
			id: id,
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: options.includeDeleted ? new Date(1) : null,
			uuid: "00000000-0000-0000-0000-000000000000",
			value: "0",
		});
	}

	protected async register(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await Promise.resolve({
			id: 1n,
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async update(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await Promise.resolve({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async enable(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await Promise.resolve({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async disable(model: DummyModel): Promise<NonNullableKeys<ModelMetadataInterface, "deletedAt">>
	{
		return await Promise.resolve({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: new Date(1),
			uuid: model.getUUID(),
		});
	}

	protected async expunge(model: DummyModel): Promise<void>
	{
		await Promise.resolve(model.getId());
	}
}

export { DummyBaseRepository };
