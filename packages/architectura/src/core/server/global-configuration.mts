import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";

class GlobalConfiguration
{
	private static readonly GLOBAL_PRE_HOOKS: Array<BasePreHook> = [];
	private static readonly GLOBAL_POST_HOOKS: Array<BasePostHook> = [];
	private static readonly GLOBAL_ERROR_HOOKS: Array<BaseErrorHook> = [];
	private static readonly PUBLIC_ASSET_DIRECTORIES: Map<string, string> = new Map();

	private constructor() { }

	/** @internal */
	public static GetGlobalPreHooks(): ReadonlyArray<BasePreHook>
	{
		return this.GLOBAL_PRE_HOOKS;
	}

	public static AddGlobalPreHook(hook: BasePreHook): void
	{
		this.GLOBAL_PRE_HOOKS.push(hook);
	}

	/** @internal */
	public static GetGlobalPostHooks(): ReadonlyArray<BasePostHook>
	{
		return this.GLOBAL_POST_HOOKS;
	}

	public static AddGlobalPostHook(hook: BasePostHook): void
	{
		this.GLOBAL_POST_HOOKS.push(hook);
	}

	/** @internal */
	public static GetGlobalErrorHooks(): ReadonlyArray<BaseErrorHook>
	{
		return this.GLOBAL_ERROR_HOOKS;
	}

	public static AddGlobalErrorHook(hook: BaseErrorHook): void
	{
		this.GLOBAL_ERROR_HOOKS.push(hook);
	}

	/** @internal */
	public static GetPublicAssetDirectories(): ReadonlyMap<string, string>
	{
		return this.PUBLIC_ASSET_DIRECTORIES;
	}

	public static async AddPublicAssetDirectory(url_path_start: string, base_directory_path: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(base_directory_path);

		this.PUBLIC_ASSET_DIRECTORIES.set(
			url_path_start.replace(/\/$/, ""),
			base_directory_path.replace(/\/$/, "")
		);
	}
}

export { GlobalConfiguration };
