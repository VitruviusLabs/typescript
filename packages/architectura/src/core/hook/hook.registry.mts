import type { Dirent } from "node:fs";
import { type ConstructorOf, isConstructor, isRecord } from "@vitruvius-labs/ts-predicate";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { BasePreHook } from "./base.pre-hook.mjs";
import { BasePostHook } from "./base.post-hook.mjs";
import { BaseErrorHook } from "./base.error-hook.mjs";

/**
 * Hook registry.
 *
 * @sealed
 */
class HookRegistry
{
	private static readonly PRE_HOOKS: Array<BasePreHook | ConstructorOf<BasePreHook>> = [];
	private static readonly POST_HOOKS: Array<BasePostHook | ConstructorOf<BasePostHook>> = [];
	private static readonly ERROR_HOOKS: Array<BaseErrorHook | ConstructorOf<BaseErrorHook>> = [];

	/**
	 * Retrieve the global pre hooks
	 *
	 * @internal
	 */
	public static GetPreHooks(): Array<BasePreHook | ConstructorOf<BasePreHook>>
	{
		return HookRegistry.PRE_HOOKS;
	}

	/**
	 * Add a global pre hook
	 *
	 * @remarks
	 * If given a hook constructor, it will be instantiated each request.
	 * If given a hook instance, it will be reused as is each request.
	 *
	 * @internal
	 */
	public static AddPreHook(hook: BasePreHook | ConstructorOf<BasePreHook>): void
	{
		if (isConstructor(hook) && HookRegistry.PRE_HOOKS.includes(hook))
		{
			throw new Error(`Pre hook ${hook.name} already added.`);
		}

		HookRegistry.PRE_HOOKS.push(hook);
	}

	/**
	 * Retrieve the global post hooks
	 *
	 * @internal
	 */
	public static GetPostHooks(): Array<BasePostHook | ConstructorOf<BasePostHook>>
	{
		return HookRegistry.POST_HOOKS;
	}

	/**
	 * Add a global post hook
	 *
	 * @remarks
	 * If given a hook constructor, it will be instantiated each request.
	 * If given a hook instance, it will be reused as is each request.
	 *
	 * @internal
	 */
	public static AddPostHook(hook: BasePostHook | ConstructorOf<BasePostHook>): void
	{
		if (isConstructor(hook) && HookRegistry.POST_HOOKS.includes(hook))
		{
			throw new Error(`Post hook ${hook.name} already added.`);
		}

		HookRegistry.POST_HOOKS.push(hook);
	}

	/**
	 * Retrieve the global error hooks
	 *
	 * @internal
	 */
	public static GetErrorHooks(): Array<BaseErrorHook | ConstructorOf<BaseErrorHook>>
	{
		return HookRegistry.ERROR_HOOKS;
	}

	/**
	 * Add a global error hook
	 *
	 * @remarks
	 * If given a hook constructor, it will be instantiated each request.
	 * If given a hook instance, it will be reused as is each request.
	 *
	 * @internal
	 */
	public static AddErrorHook(hook: BaseErrorHook | ConstructorOf<BaseErrorHook>): void
	{
		if (isConstructor(hook) && HookRegistry.ERROR_HOOKS.includes(hook))
		{
			throw new Error(`Error hook ${hook.name} already added.`);
		}

		HookRegistry.ERROR_HOOKS.push(hook);
	}

	/**
	 * Recursively explore a folder and add all hooks found.
	 *
	 * @remarks
	 * Hook exporting files are identified by their name containing either ".pre-hook.", ".post-hook.", or ".error-hook.".
	 * If the exported hook is a constructor, it will be instantiated for every request.
	 * If the exported hook is an instance, it will be reused as is for every request.
	 */
	public static async AddHooksDirectory(directory: string): Promise<void>
	{
		await FileSystemService.AssertDirectoryExistence(directory);

		await HookRegistry.ParseDirectoryForHooks(directory);
	}

	private static async ParseDirectoryForHooks(directory: string): Promise<void>
	{
		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory);

		for (const ENTITY of ENTITIES)
		{
			const ENTITY_PATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await HookRegistry.ParseDirectoryForHooks(ENTITY_PATH);

				continue;
			}

			if (!ENTITY.isFile() && /\.(?:pre|post|error)-hook\./.test(ENTITY.name))
			{
				await HookRegistry.ExtractHook(ENTITY_PATH);
			}
		}
	}

	private static async ExtractHook(path: string): Promise<void>
	{
		const EXPORTS: unknown = await FileSystemService.Import(path);

		if (isRecord(EXPORTS))
		{
			for (const [, EXPORT] of Object.entries(EXPORTS))
			{
				if (HookRegistry.IsPreHook(EXPORT))
				{
					HookRegistry.AddPreHook(EXPORT);

					return;
				}

				if (HookRegistry.IsPostHook(EXPORT))
				{
					HookRegistry.AddPostHook(EXPORT);

					return;
				}

				if (HookRegistry.IsErrorHook(EXPORT))
				{
					HookRegistry.AddErrorHook(EXPORT);

					return;
				}
			}
		}
	}

	private static IsPreHook(value: unknown): value is BasePreHook | ConstructorOf<BasePreHook>
	{
		return value instanceof BasePreHook || isConstructor(value) && value.prototype instanceof BasePreHook;
	}

	private static IsPostHook(value: unknown): value is BasePostHook | ConstructorOf<BasePostHook>
	{
		return value instanceof BasePostHook || isConstructor(value) && value.prototype instanceof BasePostHook;
	}

	private static IsErrorHook(value: unknown): value is BaseErrorHook | ConstructorOf<BaseErrorHook>
	{
		return value instanceof BaseErrorHook || isConstructor(value) && value.prototype instanceof BaseErrorHook;
	}
}

export { HookRegistry };
