import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import { RouteUtility } from "./route.utility.mjs";

/**
 * Abstract endpoint class.
 */
abstract class BaseEndpoint
{
	/**
	 * Which HTTP method match this endpoint.
	 */
	protected abstract readonly method: HTTPMethodEnum;

	/**
	 * Which URL paths match this endpoint.
	 *
	 * @remarks
	 * The route will be normalized to a regular expression, matching the whole path.
	 * You can use capture groups to extract parameters from the path.
	 */
	protected abstract readonly route: RegExp | string;
	protected readonly preHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [];
	protected readonly excludedGlobalPreHooks: Array<ConstructorOf<BasePreHook>> = [];
	protected readonly postHooks: Array<BasePostHook | ConstructorOf<BasePostHook>> = [];
	protected readonly excludedGlobalPostHooks: Array<ConstructorOf<BasePostHook>> = [];
	protected readonly errorHooks: Array<BaseErrorHook | ConstructorOf<BaseErrorHook>> = [];
	protected readonly excludedGlobalErrorHooks: Array<ConstructorOf<BaseErrorHook>> = [];
	private readonly context: ExecutionContext | undefined = undefined;

	/**
	 * Process the request.
	 */
	public abstract execute(context: ExecutionContext): Promise<void> | void;

	/**
	 * Get the method for this endpoint.
	 *
	 * @sealed
	 */
	public getMethod(): HTTPMethodEnum
	{
		return this.method;
	}

	/**
	 * Get the effective route for this endpoint.
	 *
	 * @remarks
	 * The route is normalized to a regular expression.
	 *
	 * @sealed
	 */
	public getRoute(): RegExp
	{
		return RouteUtility.NormalizeRoute(this.route);
	}

	/**
	 * Get the pre hooks of the endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the pre hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.preHooks | preHooks} property.
	 */
	public getPreHooks(): Array<BasePreHook | ConstructorOf<BasePreHook>>
	{
		return this.preHooks;
	}

	/**
	 * Get the global pre hooks to ignore for this endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the pre hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.excludedGlobalPreHooks | excludedGlobalPreHooks} property.
	 */
	public getExcludedGlobalPreHooks(): Array<ConstructorOf<BasePreHook>>
	{
		return this.excludedGlobalPreHooks;
	}

	/**
	 * Get the post hooks of the endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the post hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.postHooks | postHooks} property.
	 */
	public getPostHooks(): Array<BasePostHook | ConstructorOf<BasePostHook>>
	{
		return this.postHooks;
	}

	/**
	 * Get the global post hooks to ignore for this endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the post hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.excludedGlobalPostHooks | excludedGlobalPostHooks} property.
	 */
	public getExcludedGlobalPostHooks(): Array<ConstructorOf<BasePostHook>>
	{
		return this.excludedGlobalPostHooks;
	}

	/**
	 * Get the error hooks of the endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the error hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.errorHooks | errorHooks} property.
	 */
	public getErrorHooks(): Array<BaseErrorHook | ConstructorOf<BaseErrorHook>>
	{
		return this.errorHooks;
	}

	/**
	 * Get the global error hooks to ignore for this endpoint.
	 *
	 * @remarks
	 * If you rather want to dynamically build the error hook array, override this method.
	 * Otherwise, assign the {@link BaseEndpoint.excludedGlobalErrorHooks | excludedGlobalErrorHooks} property.
	 */
	public getExcludedGlobalErrorHooks(): Array<ConstructorOf<BaseErrorHook>>
	{
		return this.excludedGlobalErrorHooks;
	}

	/**
	 * Get the execution context for this endpoint.
	 *
	 * @remarks
	 * This method is only useful for contextual endpoints.
	 * Contextual endpoints are instantiated for every matching request.
	 *
	 * @throws when called in a non-contextual endpoint.
	 *
	 * @sealed
	 */
	protected getContext(): ExecutionContext
	{
		if (this.context === undefined)
		{
			throw new Error("This is not a contextual endpoint.");
		}

		return this.context;
	}
}

export { BaseEndpoint };
