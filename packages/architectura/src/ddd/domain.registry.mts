import type { Dirent } from "node:fs";
import { BaseDomain, FileSystemService, LoggerProxy } from "../_index.mjs";
import { TypeAssertion, TypeGuard } from "@vitruvius-labs/ts-predicate";

class DomainRegistry
{
	private static readonly DOMAIN_DIRECTORIES: Array<string> = [];
	private static lastLoadedIndex: number = 0;

	public static async AddDomainDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory_path);

		this.DOMAIN_DIRECTORIES.push(directory_path);
	}

	public static async AddDomainRootDirectory(directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory_path);

		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory_path);

		for (const ENTITY of ENTITIES)
		{
			if (ENTITY.isDirectory())
			{
				this.DOMAIN_DIRECTORIES.push(`${directory_path}/${ENTITY.name}`);
			}
		}
	}

	public static async Load(): Promise<void>
	{
		for (; this.lastLoadedIndex < this.DOMAIN_DIRECTORIES.length; ++this.lastLoadedIndex)
		{
			const DIRECTORY_PATH: string | undefined = this.DOMAIN_DIRECTORIES[this.lastLoadedIndex];

			TypeAssertion.isString(DIRECTORY_PATH);

			await this.InitializeDomain(DIRECTORY_PATH);
		}
	}

	private static async InitializeDomain(directory_path: string): Promise<void>
	{
		LoggerProxy.Debug(`Loading domain from ${directory_path}.`);

		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory_path);

		for (const ENTITY of ENTITIES)
		{
			if (ENTITY.isFile() && ENTITY.name.includes(".domain."))
			{
				LoggerProxy.Debug(`Found domain file ${ENTITY.name}.`);

				const FILE_PATH: string = `${directory_path}/${ENTITY.name}`;
				const EXPORTS: unknown = await import(FILE_PATH);

				if (TypeGuard.isRecord(EXPORTS))
				{
					for (const [, EXPORT] of Object.entries(EXPORTS))
					{
						if (this.IsDomainConstructor(EXPORT))
						{
							LoggerProxy.Debug(`Initializing domain in file ${ENTITY.name}.`);

							await EXPORT.Initialize();

							return;
						}
					}
				}
			}
		}
	}

	private static IsDomainConstructor(value: unknown): value is typeof BaseDomain
	{
		return TypeGuard.isFunction(value) && value.prototype instanceof BaseDomain;
	}
}

export { DomainRegistry };
