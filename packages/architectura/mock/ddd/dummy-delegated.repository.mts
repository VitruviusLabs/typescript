import type { NonNullableKeys } from "@vitruvius-labs/ts-predicate/helper";
import type { DummyModel } from "./dummy.model.mjs";
import type { DummyDelegateDataInterface } from "./definition/_index.mjs";
import type { DummyDelegate } from "./dummy.delegate.mjs";
import { DelegatedRepository, type ModelMetadataInterface, type RepositoryQueryNormalizedOptionsInterface } from "../../src/_index.mjs";

class DummyDelegatedRepository extends DelegatedRepository<DummyDelegate, DummyModel, typeof DummyModel, DummyDelegateDataInterface>
{
	protected async fetchByUUID(uuid: string, options: RepositoryQueryNormalizedOptionsInterface): Promise<(DummyDelegateDataInterface & ModelMetadataInterface) | undefined>
	{
		return await this.delegate.query({
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
		return await this.delegate.query({
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
		return await this.delegate.query({
			id: 1n,
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async update(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await this.delegate.query({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async restore(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await this.delegate.query({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async delete(model: DummyModel): Promise<NonNullableKeys<ModelMetadataInterface, "deletedAt">>
	{
		return await this.delegate.query({
			id: model.getId(),
			createdAt: new Date(0),
			updatedAt: new Date(1),
			deletedAt: new Date(1),
			uuid: model.getUUID(),
		});
	}

	protected async destroy(model: DummyModel): Promise<void>
	{
		await this.delegate.query(model.getId());
	}
}

export { DummyDelegatedRepository };
