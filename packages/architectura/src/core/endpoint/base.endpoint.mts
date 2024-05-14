import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import { Singleton } from "../../utility/singleton.mjs";

abstract class BaseEndpoint extends Singleton
{
	protected abstract readonly method: HTTPMethodEnum;
	protected abstract readonly route: RegExp | string;
	protected readonly preHooks: Array<BasePreHook> = [];
	protected readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [];
	protected readonly postHooks: Array<BasePostHook> = [];
	protected readonly excludedGlobalPostHooks: Array<typeof BasePostHook> = [];
	protected readonly errorHooks: Array<BaseErrorHook> = [];
	protected readonly excludedGlobalErrorHooks: Array<typeof BaseErrorHook> = [];
	private normalizedRoute: RegExp | undefined = undefined;

	private static NormalizeRoute(route: RegExp | string): RegExp
	{
		if (route instanceof RegExp)
		{
			return new RegExp(BaseEndpoint.MakeRouteWhole(route.source), route.flags);
		}

		return new RegExp(BaseEndpoint.MakeRouteWhole(route));
	}

	private static MakeRouteWhole(route: string): string
	{
		let pattern: string = route;

		if (!route.startsWith("^"))
		{
			pattern = `^${pattern}`;
		}

		if (!route.endsWith("$"))
		{
			pattern = `${pattern}$`;
		}

		return pattern;
	}

	public abstract execute(context: ExecutionContext): Promise<void> | void;

	/** @sealed */
	public getMethod(): HTTPMethodEnum
	{
		return this.method;
	}

	/** @sealed */
	public getRoute(): RegExp
	{
		if (this.normalizedRoute === undefined)
		{
			this.normalizedRoute = BaseEndpoint.NormalizeRoute(this.route);
		}

		return this.normalizedRoute;
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
