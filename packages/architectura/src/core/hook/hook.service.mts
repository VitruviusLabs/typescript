import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import type { BaseEndpoint } from "../endpoint/base.endpoint.mjs";
import type { BasePreHook } from "./base.pre-hook.mjs";
import type { BasePostHook } from "./base.post-hook.mjs";
import type { BaseErrorHook } from "./base.error-hook.mjs";
import type { HooksInterface } from "./definition/interface/hooks.interface.mjs";
import type { HookRunnerType } from "./definition/type/hook-runner.type.mjs";
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
		await this.RunHooks<BasePreHook>(
			{
				global: HookRegistry.GetPreHooks(),
				excluded: endpoint.getExcludedGlobalPreHooks(),
				local: endpoint.getPreHooks(),
			},
			async (hook: BasePreHook): Promise<void> =>
			{
				await hook.execute(context);
			}
		);
	}

	public static async RunPostHooks(endpoint: BaseEndpoint, context: ExecutionContext): Promise<void>
	{
		await this.RunHooks<BasePostHook>(
			{
				global: HookRegistry.GetPostHooks(),
				excluded: endpoint.getExcludedGlobalPostHooks(),
				local: endpoint.getPostHooks(),
			},
			async (hook: BasePostHook): Promise<void> =>
			{
				await hook.execute(context);
			}
		);
	}

	public static async RunErrorHooks(endpoint: BaseEndpoint, context: ExecutionContext, error: unknown): Promise<void>
	{
		await this.RunHooks<BaseErrorHook>(
			{
				global: HookRegistry.GetErrorHooks(),
				excluded: endpoint.getExcludedGlobalErrorHooks(),
				local: endpoint.getErrorHooks(),
			},
			async (hook: BaseErrorHook): Promise<void> =>
			{
				await hook.execute(context, error);
			}
		);
	}

	public static async RunFallbackErrorHooks(context: ExecutionContext, error: unknown): Promise<void>
	{
		await this.RunHooks<BaseErrorHook>(
			{
				global: HookRegistry.GetErrorHooks(),
				excluded: [],
				local: [],
			},
			async (hook: BaseErrorHook): Promise<void> =>
			{
				await hook.execute(context, error);
			}
		);
	}

	private static async RunHooks<T extends BasePreHook | BasePostHook | BaseErrorHook>(hooks: HooksInterface<T>, runner: HookRunnerType<T>): Promise<void>
	{
		for (const HOOK of hooks.global)
		{
			const HOOK_INSTANCE: T = HookService.InstantiateHook(HOOK);
			const HOOK_CONSTRUCTOR: ConstructorOf<T> = getConstructorOf(HOOK_INSTANCE);

			if (hooks.excluded.includes(HOOK_CONSTRUCTOR))
			{
				continue;
			}

			await runner(HOOK_INSTANCE);
		}

		for (const HOOK of hooks.local)
		{
			await runner(HookService.InstantiateHook(HOOK));
		}
	}

	private static InstantiateHook<T extends BaseErrorHook | BasePostHook | BasePreHook>(hook: ConstructorOf<T> | T): T
	{
		if (isFunction(hook))
		{
			return new hook();
		}

		return hook;
	}
}

export { HookService };
