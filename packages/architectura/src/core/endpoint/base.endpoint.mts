import type { ConstructorOf } from "@vitruvius-labs/ts-predicate";
import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import { RouteUtility } from "./route.utility.mjs";
import { assertString } from "@vitruvius-labs/ts-predicate/type-assertion";
import type { EndpointTypeInterface } from "./definition/interface/endpoint-type.interface.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import type { ExtractType } from "../../definition/type/extract.type.mjs";

/**
 * Abstract endpoint class.
 */
abstract class BaseEndpoint<T extends EndpointTypeInterface = object>
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

	protected path: ExtractType<T, "path"> | undefined = undefined;
	protected query: ExtractType<T, "query"> | undefined = undefined;
	protected payload: ExtractType<T, "payload"> | undefined = undefined;
	protected response: ExtractType<T, "response"> | undefined = undefined;

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

	/**
	 * Get a specific fragment of the request path as a string.
	 *
	 * @remarks
	 * This method will check that the requested fragment is strictly a string.
	 *
	 * @throws when the requested fragment is not a string.
	 *
	 * @sealed
	 */
	protected getPathFragment(key: string): string
	{
		const part: unknown = this.getContext().getRequest().getPathMatchGroups()[key];

		assertString(part);

		return part;
	}

	/**
	 * Asserts the path of the request
	 *
	 * @remarks
	 * This method is meant to be overridden to assert the path of the request.
	 * It always throws an error by default.
	 */
	protected assertPath(value: unknown): asserts value is ExtractType<T, "path">
	{
		throw new Error(`Method not implemented for endpoint ${this.constructor.name} with value ${JSON.stringify(value)}.`);
	}

	/**
	 * Get the path of the request.
	 *
	 * @remarks
	 * This method will run the assertPath method before returning the path.
	 *
	 * @sealed
	 */
	protected getPath(): ExtractType<T, "path">
	{
		if (this.path === undefined)
		{
			const path: unknown = this.getContext().getRequest().getPathMatchGroups();

			this.assertPath(path);

			this.path = path;
		}

		return this.path;
	}

	/**
	 * Asserts the query of the request
	 *
	 * @remarks
	 * This method is meant to be overridden to assert the query of the request.
	 * It always throws an error by default.
	 */
	protected assertQuery(value: unknown): asserts value is ExtractType<T, "query">
	{
		LoggerProxy.Error(`Attempted to on value ${JSON.stringify(value)} without defining it.`);

		throw new Error(`Method not implemented for endpoint ${this.constructor.name}.`);
	}

	/**
	 * Get the query of the request.
	 *
	 * @remarks
	 * This method will run the assertQuery method before returning the query.
	 *
	 * @sealed
	 */
	protected getQuery(): ExtractType<T, "query">
	{
		if (this.query === undefined)
		{
			const query: unknown = this.getContext().getRequest().getQuery();

			this.assertQuery(query);

			this.query = query;
		}

		return this.query;
	}

	/**
	 * Asserts the payload of the request.
	 *
	 * @remarks
	 * This method is meant to be overridden to assert the payload of the request.
	 * It always throws an error by default.
	 */
	protected assertPayload(value: unknown): asserts value is ExtractType<T, "payload">
	{
		LoggerProxy.Error(`Attempted to on value ${JSON.stringify(value)} without defining it.`);

		throw new Error(`Method not implemented for endpoint ${this.constructor.name}.`);
	}

	/**
	 * Get the payload (body) of the request.
	 *
	 * @remarks
	 * This method will run the assertPayload method before returning the payload.
	 *
	 * @sealed
	 */
	protected async getPayload(): Promise<ExtractType<T, "payload">>
	{
		if (this.payload === undefined)
		{
			const payload: unknown = await this.getContext().getRequest().getBodyAsJSON();

			this.assertPayload(payload);

			this.payload = payload;
		}

		return this.payload;
	}

	/**
	 * Builds the response of the request.
	 *
	 * @remarks
	 * This method is meant to be overridden to build the response of the request.
	 * It always throws an error by default.
	 */
	// @ts-expect-error - This method is meant to be overridden.
	protected async buildResponse(): Promise<ExtractType<T, "response">>
	{
		LoggerProxy.Error(`Attempted to build response without defining it for endpoint ${this.constructor.name}.`);

		await Promise.reject(new Error("Method not implemented."));
	}

	/**
	 * Get the response of the request.
	 *
	 * @remarks
	 * This method will run the buildResponse method before returning the response.
	 *
	 * @throws when the response is not defined after running the buildResponse method.
	 *
	 * @sealed
	 */
	protected async getResponse(): Promise<ExtractType<T, "response">>
	{
		if (this.response === undefined)
		{
			this.response = await this.buildResponse();
		}

		if (this.response === undefined)
		{
			throw new Error("The response is not defined.");
		}

		return this.response;
	}
}

export { BaseEndpoint };
