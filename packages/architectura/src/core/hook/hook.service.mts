import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import type { BaseEndpoint } from "../endpoint/base.endpoint.mjs";
import type { BasePreHook } from "./base.pre-hook.mjs";
import type { BasePostHook } from "./base.post-hook.mjs";
import type { BaseErrorHook } from "./base.error-hook.mjs";
import type { HooksInterface } from "./definition/interface/hooks.interface.mjs";
import { isFunction } from "@vitruvius-labs/ts-predicate/type-guard";
import { HookRegistry } from "./hook.registry.mjs";
import { getConstructorOf } from "@vitruvius-labs/ts-predicate/helper";

/**
 * Handle running hooks
 *
 * @internal
*/
class HookService
{
	public static async RunPreHooks(endpoint: BaseEndpoint, context: ExecutionContext): Promise<void>
	{
		const HOOKS: Array<BasePreHook> = this.CompileHooks({
			context: context,
			global: HookRegistry.GetPreHooks(),
			excluded: endpoint.getExcludedGlobalPreHooks(),
			local: endpoint.getPreHooks(),
		});

		for (const HOOK of HOOKS)
		{
			await HOOK.execute(context);
		}
	}

	public static async RunPostHooks(endpoint: BaseEndpoint, context: ExecutionContext): Promise<void>
	{
		const HOOKS: Array<BasePostHook> = this.CompileHooks({
			context: context,
			global: HookRegistry.GetPostHooks(),
			excluded: endpoint.getExcludedGlobalPostHooks(),
			local: endpoint.getPostHooks(),
		});

		for (const HOOK of HOOKS)
		{
			await HOOK.execute(context);
		}
	}

	public static async RunErrorHooks(endpoint: BaseEndpoint, context: ExecutionContext, error: unknown): Promise<void>
	{
		const HOOKS: Array<BaseErrorHook> = this.CompileHooks({
			context: context,
			global: HookRegistry.GetErrorHooks(),
			excluded: endpoint.getExcludedGlobalErrorHooks(),
			local: endpoint.getErrorHooks(),
		});

		for (const HOOK of HOOKS)
		{
			await HOOK.execute(context, error);
		}
	}

	public static async RunFallbackErrorHooks(context: ExecutionContext, error: unknown): Promise<void>
	{
		const HOOKS: Array<BaseErrorHook> = this.CompileHooks({
			context: context,
			global: HookRegistry.GetErrorHooks(),
			excluded: [],
			local: [],
		});

		for (const HOOK of HOOKS)
		{
			await HOOK.execute(context, error);
		}
	}

	private static CompileHooks<T extends BasePreHook | BasePostHook | BaseErrorHook>(hooks: HooksInterface<T>): Array<T>
	{
		const HOOKS: Array<T> = [];

		for (const HOOK of hooks.global)
		{
			const HOOK_INSTANCE: T = HookService.InstantiateHook(HOOK, hooks.context);
			const HOOK_CONSTRUCTOR: ConstructorOf<T> = getConstructorOf(HOOK_INSTANCE);

			if (hooks.excluded.includes(HOOK_CONSTRUCTOR))
			{
				continue;
			}

			HOOKS.push(HOOK_INSTANCE);
		}

		for (const HOOK of hooks.local)
		{
			const HOOK_INSTANCE: T = HookService.InstantiateHook(HOOK, hooks.context);

			HOOKS.push(HOOK_INSTANCE);
		}

		return HOOKS;
	}

	private static InstantiateHook<T extends BaseErrorHook | BasePostHook | BasePreHook>(hook: ConstructorOf<T> | T, context: ExecutionContext): T
	{
		if (isFunction(hook))
		{
			const HOOK: T = new hook();

			Reflect.set(HOOK, "context", context);

			return HOOK;
		}

		return hook;
	}
}

export { HookService };
