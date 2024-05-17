import type { Dirent } from "node:fs";
import { type ConstructorOf, getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";
import { isFunction, isRecord } from "@vitruvius-labs/ts-predicate/type-guard";
import { FileSystemService } from "../../service/file-system/file-system.service.mjs";
import { BasePreHook } from "./base.pre-hook.mjs";
import { BasePostHook } from "./base.post-hook.mjs";
import { BaseErrorHook } from "./base.error-hook.mjs";

class HookRegistry
{
	private static readonly PRE_HOOKS: Array<BasePreHook | ConstructorOf<BasePreHook>> = [];
	private static readonly POST_HOOKS: Array<BasePostHook | ConstructorOf<BasePostHook>> = [];
	private static readonly ERROR_HOOKS: Array<BaseErrorHook | ConstructorOf<BaseErrorHook>> = [];

	/** @internal */
	public static GetPreHooks(): ReadonlyArray<BasePreHook>
	{
		return this.PRE_HOOKS.map(this.Instantiate);
	}

	public static AddPreHook(hook: BasePreHook | ConstructorOf<BasePreHook>): void
	{
		if (this.PRE_HOOKS.includes(hook))
		{
			throw new Error(`Pre hook ${this.GetConstructorName(hook)} already added.`);
		}

		this.PRE_HOOKS.push(hook);
	}

	/** @internal */
	public static GetPostHooks(): ReadonlyArray<BasePostHook>
	{
		return this.POST_HOOKS.map(this.Instantiate);
	}

	public static AddPostHook(hook: BasePostHook | ConstructorOf<BasePostHook>): void
	{
		if (this.POST_HOOKS.includes(hook))
		{
			throw new Error(`Post hook ${this.GetConstructorName(hook)} already added.`);
		}

		this.POST_HOOKS.push(hook);
	}

	/** @internal */
	public static GetErrorHooks(): ReadonlyArray<BaseErrorHook>
	{
		return this.ERROR_HOOKS.map(this.Instantiate);
	}

	public static AddErrorHook(hook: BaseErrorHook | ConstructorOf<BaseErrorHook>): void
	{
		if (this.ERROR_HOOKS.includes(hook))
		{
			throw new Error(`Error hook ${this.GetConstructorName(hook)} already added.`);
		}

		this.ERROR_HOOKS.push(hook);
	}

	public static async AddHooksDirectory(directory: string): Promise<void>
	{
		await FileSystemService.ConfirmDirectoryExistence(directory);

		await this.ParseDirectoryForHooks(directory);
	}

	private static async ParseDirectoryForHooks(directory: string): Promise<void>
	{
		const ENTITIES: Array<Dirent> = await FileSystemService.ReadDirectory(directory);

		for (const ENTITY of ENTITIES)
		{
			const ENTITY_PATH: string = `${directory}/${ENTITY.name}`;

			if (ENTITY.isDirectory())
			{
				await this.ParseDirectoryForHooks(ENTITY_PATH);

				continue;
			}

			if (!ENTITY.isFile() && /\.(?:pre|post|error)-hook\./.test(ENTITY.name))
			{
				await this.ExtractHook(ENTITY_PATH);
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
				if (this.IsPreHook(EXPORT))
				{
					this.AddPreHook(EXPORT);

					return;
				}

				if (this.IsPostHook(EXPORT))
				{
					this.AddPostHook(EXPORT);

					return;
				}

				if (this.IsErrorHook(EXPORT))
				{
					this.AddErrorHook(EXPORT);

					return;
				}
			}
		}
	}

	private static Instantiate<T extends object>(this: void, hook: ConstructorOf<T> | T): T
	{
		if (isFunction(hook))
		{
			return new hook();
		}

		return hook;
	}

	private static IsPreHook(value: unknown): value is BasePreHook | ConstructorOf<BasePreHook>
	{
		return value instanceof BasePreHook || isFunction(value) && value.prototype instanceof BasePreHook;
	}

	private static IsPostHook(value: unknown): value is BasePostHook | ConstructorOf<BasePostHook>
	{
		return value instanceof BasePostHook || isFunction(value) && value.prototype instanceof BasePostHook;
	}

	private static IsErrorHook(value: unknown): value is BaseErrorHook | ConstructorOf<BaseErrorHook>
	{
		return value instanceof BaseErrorHook || isFunction(value) && value.prototype instanceof BaseErrorHook;
	}

	private static GetConstructorName(value: ConstructorOf<object> | object): string
	{
		if (isFunction(value))
		{
			return value.name;
		}

		return getConstructorOf(value).name;
	}
}

export { HookRegistry };
