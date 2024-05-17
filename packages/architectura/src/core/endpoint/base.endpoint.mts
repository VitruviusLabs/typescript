import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import { RouteUtility } from "./route.utility.mjs";

abstract class BaseEndpoint
{
	protected abstract readonly method: HTTPMethodEnum;
	protected abstract readonly route: RegExp | string;
	protected readonly preHooks: Array<BasePreHook> = [];
	protected readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [];
	protected readonly postHooks: Array<BasePostHook> = [];
	protected readonly excludedGlobalPostHooks: Array<typeof BasePostHook> = [];
	protected readonly errorHooks: Array<BaseErrorHook> = [];
	protected readonly excludedGlobalErrorHooks: Array<typeof BaseErrorHook> = [];

	public abstract execute(context: ExecutionContext): Promise<void> | void;

	/** @sealed */
	public getMethod(): HTTPMethodEnum
	{
		return this.method;
	}

	/** @sealed */
	public getRoute(): RegExp
	{
		return RouteUtility.NormalizeRoute(this.route);
	}

	public getPreHooks(): Array<BasePreHook>
	{
		return this.preHooks;
	}

	public getExcludedGlobalPreHooks(): Array<typeof BasePreHook>
	{
		return this.excludedGlobalPreHooks;
	}

	public getPostHooks(): Array<BasePostHook>
	{
		return this.postHooks;
	}

	public getExcludedGlobalPostHooks(): Array<typeof BasePostHook>
	{
		return this.excludedGlobalPostHooks;
	}

	public getErrorHooks(): Array<BaseErrorHook>
	{
		return this.errorHooks;
	}

	public getExcludedGlobalErrorHooks(): Array<typeof BaseErrorHook>
	{
		return this.excludedGlobalErrorHooks;
	}
}

export { BaseEndpoint };
