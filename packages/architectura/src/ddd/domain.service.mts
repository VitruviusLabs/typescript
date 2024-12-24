import type { Dirent } from "node:fs";
import { isConstructor, isRecord } from "@vitruvius-labs/ts-predicate/type-guard";
import { FileSystemService } from "../service/file-system/file-system.service.mjs";
import { LoggerProxy } from "../service/logger/logger.proxy.mjs";
import { BaseDomain } from "./base.domain.mjs";

/**
 * Service for loading domains from a directory
 *
 * @sealed
 */
class DomainService
{
	/**
	 * Load a domain from a directory
	 *
	 * @remarks
	 * Domain exporting files are identified by their name containing ".domain.".
	 *
	 * @throws if no domain is found in the directory
	 */
	public static async LoadFromDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(directory_path);

		const FOUND: boolean = await DomainService.Load(directory_path);

		if (!FOUND)
		{
			throw new Error(`No domain found in directory ${directory_path}.`);
		}
	}

	/**
	 * Attempt to load a domain from each sub-directory
	 *
	 * @remarks
	 * Domain exporting files are identified by their name containing ".domain.".
	 */
	public static async LoadMultipleFromRootDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(directory_path);

		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory_path);

		for (const ENTITY of ENTITIES)
		{
			if (ENTITY.isDirectory())
			{
				await DomainService.Load(`${directory_path}/${ENTITY.name}`);
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

				const EXPORTS: unknown = await FileSystemService.Import(`${directory_path}/${ENTITY.name}`);

				if (isRecord(EXPORTS))
				{
					for (const [, EXPORT] of Object.entries(EXPORTS))
					{
						if (DomainService.IsDomainConstructor(EXPORT))
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
		return isConstructor(value) && value.prototype instanceof BaseDomain;
	}
}

export { DomainService };
