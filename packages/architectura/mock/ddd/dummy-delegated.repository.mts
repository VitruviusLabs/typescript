import type { DummyModel } from "./dummy.model.mjs";
import type { DummyTransformInstantiationInterface } from "./definition/_index.mjs";
import { DelegatedRepository, type ModelMetadataInterface } from "../../src/_index.mjs";
import type { DummyDelegate } from "./dummy.delegate.mjs";

class DummyDelegatedRepository extends DelegatedRepository<DummyDelegate, DummyModel, typeof DummyModel, DummyTransformInstantiationInterface>
{
	protected async fetchByUUID(uuid: string): Promise<(DummyTransformInstantiationInterface & ModelMetadataInterface) | undefined>
	{
		return await this.delegate.query({
			id: 0n,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: uuid,
			value: "0",
		});
	}

	protected async fetchById(id: bigint): Promise<(DummyTransformInstantiationInterface & ModelMetadataInterface) | undefined>
	{
		return await this.delegate.query({
			id: id,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: "00000000-0000-0000-0000-000000000000",
			value: "0",
		});
	}

	protected async register(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await this.delegate.query({
			id: 0n,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async update(model: DummyModel): Promise<ModelMetadataInterface>
	{
		return await this.delegate.query({
			id: model.getId(),
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: model.getUUID(),
		});
	}

	protected async destroy(id: bigint): Promise<void>
	{
		await this.delegate.query(id);
	}
}

export { DummyDelegatedRepository };
