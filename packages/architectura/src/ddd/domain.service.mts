import type { Dirent } from "node:fs";
import { BaseDomain, FileSystemService, LoggerProxy } from "../_index.mjs";
import { TypeGuard } from "@vitruvius-labs/ts-predicate";

class DomainService
{
	public static async LoadFromDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory_path);

		const FOUND: boolean = await this.Load(directory_path);

		if (!FOUND)
		{
			throw new Error(`No domain found in directory ${directory_path}.`);
		}
	}

	public static async LoadMultipleFromRootDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory_path);

		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory_path);

		for (const ENTITY of ENTITIES)
		{
			if (ENTITY.isDirectory())
			{
				await this.Load(`${directory_path}/${ENTITY.name}`);
			}
		}
	}

	private static async Load(directory_path: string): Promise<boolean>
	{
		LoggerProxy.Debug(`Looking for domain in directory ${directory_path}.`);

		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory_path);

		for (const ENTITY of ENTITIES)
		{
			if (ENTITY.isFile() && ENTITY.name.includes(".domain."))
			{
				LoggerProxy.Debug(`Found domain file ${ENTITY.name}.`);

				const EXPORTS: unknown = await import(`${directory_path}/${ENTITY.name}`);

				if (TypeGuard.isRecord(EXPORTS))
				{
					for (const [, EXPORT] of Object.entries(EXPORTS))
					{
						if (this.IsDomainConstructor(EXPORT))
						{
							LoggerProxy.Debug(`Initializing domain in file ${ENTITY.name}.`);

							await EXPORT.Initialize();

							return true;
						}
					}
				}
			}
		}

		return false;
	}

	private static IsDomainConstructor(value: unknown): value is typeof BaseDomain
	{
		return TypeGuard.isFunction(value) && value.prototype instanceof BaseDomain;
	}
}

export { DomainService };
