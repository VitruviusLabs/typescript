import type { BaseModel } from "./base.model.mjs";
import type { BaseModelInstantiationInterface } from "./definition/interface/base-model-instantiation.interface.mjs";
import type { ModelMetadataInterface } from "./definition/interface/model-metadata.interface.mjs";
import type { BaseFactory } from "./base.factory.mjs";

abstract class BaseRepository<
	T extends BaseModel,
	I extends BaseModelInstantiationInterface,
	C extends new (arg: I) => T
>
{
	protected readonly factory: BaseFactory<T, I, C>;

	public constructor(factory: BaseFactory<T, I, C>)
	{
		this.factory = factory;
	}

	protected abstract fetchByUUID(uuid: string): Promise<(I & ModelMetadataInterface) | undefined>;
	protected abstract fetchById(id: number): Promise<(I & ModelMetadataInterface) | undefined>;
	protected abstract register(model: T): Promise<ModelMetadataInterface>;
	protected abstract update(model: T): Promise<ModelMetadataInterface>;
	protected abstract destroy(id: number): Promise<void>;

	public async findByUUID(uuid: string): Promise<T | undefined>
	{
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchByUUID(uuid);

		if (data === undefined)
		{
			return undefined;
		}

		const model: T = this.factory.create(data);

		this.setImmutableFields(model, data);

		return model;
	}

	public async getByUUID(uuid: string): Promise<T>
	{
		const model: T | undefined = await this.findByUUID(uuid);

		if (model === undefined)
		{
			throw new Error(`Entity with UUID ${uuid} not found.`);
		}

		return model;
	}

	public async findById(id: number): Promise<T | undefined>
	{
		const data: (I & ModelMetadataInterface) | undefined = await this.fetchById(id);

		if (data === undefined)
		{
			return undefined;
		}

		const model: T = this.factory.create(data);

		this.setImmutableFields(model, data);

		return model;
	}

	public async getById(id: number): Promise<T>
	{
		const model: T | undefined = await this.findById(id);

		if (model === undefined)
		{
			throw new Error(`Entity with id ${id.toString()} not found.`);
		}

		return model;
	}

	public async save(model: T): Promise<void>
	{
		if (model.hasId())
		{
			// eslint-disable-next-line @typescript-eslint/no-shadow -- Harmless shadowing
			const metadata: ModelMetadataInterface = await this.update(model);

			this.setImmutableFields(model, metadata);

			return;
		}

		const metadata: ModelMetadataInterface = await this.register(model);

		this.setImmutableFields(model, metadata);
	}

	public async delete(model: T): Promise<void>
	{
		await this.destroy(model.getId());

		this.clearImmutableFields(model);
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Keep the rest clean
	private setImmutableFields(model: T, data: ModelMetadataInterface): void
	{
		Reflect.set(model, "id", data.id);
		Reflect.set(model, "createdAt", data.createdAt);
		Reflect.set(model, "updatedAt", data.updatedAt);
		Reflect.set(model, "deletedAt", data.deletedAt);
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Keep the rest clean
	private clearImmutableFields(model: T): void
	{
		Reflect.set(model, "id", undefined);
		Reflect.set(model, "createdAt", undefined);
		Reflect.set(model, "updatedAt", undefined);
		Reflect.set(model, "deletedAt", undefined);
	}
}

export { BaseRepository };
