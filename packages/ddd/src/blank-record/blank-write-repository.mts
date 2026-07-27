import type { BlankRecord } from "./blank-record.mjs";
import type { WriteRepositoryHooks } from "./write-repository-hooks.mjs";
import { WriteRepository } from "../base/primary/write-repository.mjs";
import { RepositoryActionEnum } from "./properties/repository-status/definition/enum/repository-action.enum.mjs";

abstract class BlankWriteRepository<M extends BlankRecord<M>> extends WriteRepository<M>
{
	protected readonly hooks: WriteRepositoryHooks<M> | undefined;

	public constructor(hooks?: WriteRepositoryHooks<M>)
	{
		super();

		this.hooks = hooks;
	}

	protected abstract register(instance: M): Promise<Date>;
	protected abstract update(instance: M): Promise<Date>;
	protected abstract archive(instance: M): Promise<Date>;
	protected abstract restore(instance: M): Promise<Date>;
	protected abstract destroy(instance: M): Promise<void>;

	public async saveRecord(instance: M): Promise<void>
	{
		const action: RepositoryActionEnum = instance.getStatus().getAction();

		switch (action)
		{
			case RepositoryActionEnum.REGISTER:
				await this.registerRecord(instance);
				break;

			case RepositoryActionEnum.UPDATE:
				await this.updateRecord(instance);
				break;

			case RepositoryActionEnum.ARCHIVE:
				await this.archiveRecord(instance);
				break;

			case RepositoryActionEnum.RESTORE:
				await this.restoreRecord(instance);
				break;

			case RepositoryActionEnum.DESTROY:
				await this.destroyRecord(instance);
				break;

			case RepositoryActionEnum.ERROR_ARCHIVED:
				throw new Error("Impossible to save an archived record");

			case RepositoryActionEnum.ERROR_DESTROYED:
				throw new Error("Impossible to save a destroyed record");
		}
	}

	protected async registerRecord(instance: M): Promise<void>
	{
		if (this.hooks !== undefined)
		{
			await this.hooks.onPreRegister(instance);
		}

		const date: Date = await this.register(instance);

		await instance.getRegistrationDate().setRepositoryValue(date);
		await instance.getLastUpdateDate().setRepositoryValue(date);
		await instance.getStatus().repositoryConfirmation();

		for (const property of instance.properties())
		{
			property.overwritePreviousValue();
		}

		if (this.hooks !== undefined)
		{
			await this.hooks.onPostRegister(instance);
		}
	}

	protected async updateRecord(instance: M): Promise<void>
	{
		if (this.hooks !== undefined)
		{
			await this.hooks.onPreUpdate(instance);
		}

		const date: Date = await this.update(instance);

		await instance.getLastUpdateDate().setRepositoryValue(date);
		await instance.getStatus().repositoryConfirmation();

		for (const property of instance.properties())
		{
			property.overwritePreviousValue();
		}

		if (this.hooks !== undefined)
		{
			await this.hooks.onPostUpdate(instance);
		}
	}

	protected async archiveRecord(instance: M): Promise<void>
	{
		if (this.hooks !== undefined)
		{
			await this.hooks.onPreArchive(instance);
		}

		const date: Date = await this.archive(instance);

		await instance.getLastUpdateDate().setRepositoryValue(date);
		await instance.getStatus().repositoryConfirmation();

		if (this.hooks !== undefined)
		{
			await this.hooks.onPostArchive(instance);
		}
	}

	protected async restoreRecord(instance: M): Promise<void>
	{
		if (this.hooks !== undefined)
		{
			await this.hooks.onPreRestore(instance);
		}

		const date: Date = await this.restore(instance);

		await instance.getLastUpdateDate().setRepositoryValue(date);
		await instance.getStatus().repositoryConfirmation();

		if (this.hooks !== undefined)
		{
			await this.hooks.onPostRestore(instance);
		}
	}

	protected async destroyRecord(instance: M): Promise<void>
	{
		if (this.hooks !== undefined)
		{
			await this.hooks.onPreDestroy(instance);
		}

		await this.destroy(instance);

		await instance.getStatus().repositoryConfirmation();

		if (this.hooks !== undefined)
		{
			await this.hooks.onPostDestroy(instance);
		}
	}
}

export { BlankWriteRepository };
