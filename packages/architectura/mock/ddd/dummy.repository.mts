import type { DummyModel } from "./dummy.model.mjs";
import type { DummyInstantiationInterface } from "./definition/_index.mjs";
import { BaseRepository, type ModelMetadataInterface } from "../../src/_index.mjs";

class DummyRepository extends BaseRepository<DummyModel, typeof DummyModel>
{
	protected async fetchByUUID(uuid: string): Promise<(DummyInstantiationInterface & ModelMetadataInterface) | undefined>
	{
		await Promise.resolve();

		return {
			id: 0n,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: uuid,
			value: 0,
		};
	}

	protected async fetchById(id: bigint): Promise<(DummyInstantiationInterface & ModelMetadataInterface) | undefined>
	{
		await Promise.resolve();

		return {
			id: id,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: "00000000-0000-0000-0000-000000000000",
			value: 0,
		};
	}

	protected async register(model: DummyModel): Promise<ModelMetadataInterface>
	{
		await Promise.resolve();

		return {
			id: 0n,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: model.getUUID(),
		};
	}

	protected async update(model: DummyModel): Promise<ModelMetadataInterface>
	{
		await Promise.resolve();

		return {
			id: model.getId(),
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			uuid: model.getUUID(),
		};
	}

	protected async destroy(id: bigint): Promise<void>
	{
		await Promise.resolve(id);
	}
}

export { DummyRepository };
