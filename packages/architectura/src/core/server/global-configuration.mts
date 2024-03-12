import type { Dirent } from "node:fs";
import type { BasePreHook } from "../../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../../hook/base.error-hook.mjs";
import { readdir } from "node:fs/promises";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";

class GlobalConfiguration
{
	private static readonly GLOBAL_PRE_HOOKS: Array<BasePreHook> = [];
	private static readonly GLOBAL_POST_HOOKS: Array<BasePostHook> = [];
	private static readonly GLOBAL_ERROR_HOOKS: Array<BaseErrorHook> = [];
	private static readonly PUBLIC_ASSET_DIRECTORIES: Map<string, string> = new Map<string, string>();
	private static readonly DOMAIN_DIRECTORIES: Array<string> = [];

	private constructor() {}

	/**
	 * @internal
	 */
	public static GetGlobalPreHooks(): ReadonlyArray<BasePreHook>
	{
		return this.GLOBAL_PRE_HOOKS;
	}

	public static AddGlobalPreHook(hook: BasePreHook): void
	{
		this.GLOBAL_PRE_HOOKS.push(hook);
	}

	/**
	 * @internal
	 */
	public static GetGlobalPostHooks(): ReadonlyArray<BasePostHook>
	{
		return this.GLOBAL_POST_HOOKS;
	}

	public static AddGlobalPostHook(hook: BasePostHook): void
	{
		this.GLOBAL_POST_HOOKS.push(hook);
	}

	/**
	 * @internal
	 */
	public static GetGlobalErrorHooks(): ReadonlyArray<BaseErrorHook>
	{
		return this.GLOBAL_ERROR_HOOKS;
	}

	public static AddGlobalErrorHook(hook: BaseErrorHook): void
	{
		this.GLOBAL_ERROR_HOOKS.push(hook);
	}

	/**
	 * @internal
	 */
	public static GetPublicAssetDirectories(): ReadonlyMap<string, string>
	{
		return this.PUBLIC_ASSET_DIRECTORIES;
	}

	public static async AddPublicAssetDirectory(route: string, directory_path: string): Promise<void>
	{
		await this.ConfirmDirectoryExistence(directory_path);

		this.PUBLIC_ASSET_DIRECTORIES.set(route, directory_path);
	}

	public static async SetPublicAssetDirectories(directory_paths: Map<string, string>): Promise<void>
	{
		for (const [ROUTE, DIRECTORY_PATH] of directory_paths)
		{
			await this.AddPublicAssetDirectory(ROUTE, DIRECTORY_PATH);
		}
	}

	/**
	 * @internal
	 */
	public static GetDomainDirectories(): ReadonlyArray<string>
	{
		return this.DOMAIN_DIRECTORIES;
	}

	public static async AddDomainDirectory(directory_path: string): Promise<void>
	{
		await this.ConfirmDirectoryExistence(directory_path);

		this.DOMAIN_DIRECTORIES.push(directory_path);
	}

	public static async AddDomainRootDirectory(directory_path: string): Promise<void>
	{
		await this.ConfirmDirectoryExistence(directory_path);

		const FILES: Array<Dirent> = await readdir(directory_path, { withFileTypes: true });

		for (const FILE of FILES)
		{
			if (FILE.isDirectory())
			{
				this.DOMAIN_DIRECTORIES.push(`${directory_path}/${FILE.name}`);
			}
		}
	}

	private static async ConfirmDirectoryExistence(directory_path: string): Promise<void>
	{
		if (!await FileSystemService.DirectoryExists(directory_path))
		{
			throw new Error(`Impossible to add directory ${directory_path}, check that the directory exists, it's readable, and the path is correct.`);
		}
	}
}

export { GlobalConfiguration };
