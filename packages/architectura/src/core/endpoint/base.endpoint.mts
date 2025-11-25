import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import type { BasePreHook } from "../hook/base.pre-hook.mjs";
import type { BasePostHook } from "../hook/base.post-hook.mjs";
import type { BaseErrorHook } from "../hook/base.error-hook.mjs";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import type { AccessControlDefinition } from "./access-control-definition.mjs";
import type { BaseEndpointTypingInterface } from "./definition/interface/base-endpoint-typing.interface.mjs";
import { type ConstructorOf, ValidationError, normalizeErrorTree, toError } from "@vitruvius-labs/ts-predicate";
import { RouteUtility } from "./route.utility.mjs";
import { HTTPError } from "../server/http-error.mjs";
import { HTTPStatusCodeEnum } from "../server/definition/enum/http-status-code.enum.mjs";

/**
 * Abstract endpoint class.
 */
abstract class BaseEndpoint<T extends BaseEndpointTypingInterface = object>
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

	/**
	 * Access control definition for this endpoint.
	 *
	 * @remarks
	 * This property is optional.
	 * If you want to enable CORS for this endpoint, set this property to an instance of AccessControlDefinition.
	 */
	protected readonly accessControlDefinition?: AccessControlDefinition;

	protected readonly preHooks: Array<BasePreHook | ConstructorOf<BasePreHook>> = [];
	protected readonly excludedGlobalPreHooks: Array<ConstructorOf<BasePreHook>> = [];
	protected readonly postHooks: Array<BasePostHook | ConstructorOf<BasePostHook>> = [];
	protected readonly excludedGlobalPostHooks: Array<ConstructorOf<BasePostHook>> = [];
	protected readonly errorHooks: Array<BaseErrorHook | ConstructorOf<BaseErrorHook>> = [];
	protected readonly excludedGlobalErrorHooks: Array<ConstructorOf<BaseErrorHook>> = [];

	protected pathVariables: T["pathVariables"] | undefined = undefined;
	protected query: T["query"] | undefined = undefined;
	protected payload: T["payload"] | undefined = undefined;
	protected response: T["response"] | undefined = undefined;

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
	 * Get the access control definition for this endpoint.
	 *
	 * @sealed
	 */
	public getAccessControlDefinition(): AccessControlDefinition | undefined
	{
		return this.accessControlDefinition;
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
	protected getPathVariable(key: string): string
	{
		return this.getContext().getRequest().getPathVariable(key);
	}

	/**
	 * Asserts the path variables of the request
	 *
	 * @remarks
	 * This method is meant to be overridden to assert the path variables of the request.
	 * It always throws an error by default.
	 */
	protected assertPathVariables(value: unknown): asserts value is T["pathVariables"]
	{
		// eslint-disable-next-line @ts/no-unused-expressions -- Pretend to use the value
		value;

		throw new Error(`Method "assertPathVariables" needs an override in endpoint ${this.constructor.name}.`);
	}

	/**
	 * Get the path variables of the request.
	 *
	 * @remarks
	 * This method will run the assertPathFragments method before returning the path variables.
	 *
	 * @sealed
	 */
	protected getPathVariables(): T["pathVariables"]
	{
		if (this.pathVariables === undefined)
		{
			const variables: Record<string, string> = this.getContext().getRequest().getPathVariables();

			try
			{
				this.assertPathVariables(variables);
			}
			catch (error: unknown)
			{
				this.handleValidationError("Invalid path", error);
			}

			this.pathVariables = variables;
		}

		return this.pathVariables;
	}

	/**
	 * Asserts the query of the request
	 *
	 * @remarks
	 * This method is meant to be overridden to assert the query of the request.
	 * It always throws an error by default.
	 */
	protected assertQuery(value: unknown): asserts value is T["query"]
	{
		// eslint-disable-next-line @ts/no-unused-expressions -- Pretend to use the value
		value;

		throw new Error(`Method "assertQuery" needs an override in endpoint ${this.constructor.name}.`);
	}

	/**
	 * Get the query of the request.
	 *
	 * @remarks
	 * This method will run the assertQuery method before returning the query.
	 *
	 * @sealed
	 */
	protected getQuery(): T["query"]
	{
		if (this.query === undefined)
		{
			const query: unknown = this.getContext().getRequest().getQuery();

			try
			{
				this.assertQuery(query);
			}
			catch (error: unknown)
			{
				this.handleValidationError("Invalid query parameters", error);
			}

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
	protected assertPayload(value: unknown): asserts value is T["payload"]
	{
		// eslint-disable-next-line @ts/no-unused-expressions -- Pretend to use the value
		value;

		throw new Error(`Method "assertPayload" needs an override in endpoint ${this.constructor.name}.`);
	}

	/**
	 * Get the payload (body) of the request.
	 *
	 * @remarks
	 * This method will run the assertPayload method before returning the payload.
	 *
	 * @sealed
	 */
	protected async getPayload(): Promise<T["payload"]>
	{
		if (this.payload === undefined)
		{
			const payload: unknown = await this.getContext().getRequest().getBodyAsJSON();

			try
			{
				this.assertPayload(payload);
			}
			catch (error: unknown)
			{
				this.handleValidationError("Invalid payload", error);
			}

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
	protected buildResponse(): T["response"] | Promise<T["response"]>
	{
		throw new Error(`Method "buildResponse" need an override in endpoint ${this.constructor.name}.`);
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
	protected async getResponse(): Promise<T["response"]>
	{
		if (this.response === undefined)
		{
			this.response = await this.buildResponse();
		}

		return this.response;
	}

	// eslint-disable-next-line @ts/class-methods-use-this -- Not needed
	protected handleValidationError(message: string, error: unknown): never
	{
		if (error instanceof ValidationError)
		{
			throw new HTTPError({
				message: message,
				statusCode: HTTPStatusCodeEnum.UNPROCESSABLE_ENTITY,
				data: normalizeErrorTree(error),
			});
		}

		throw toError(error);
	}
}

export { BaseEndpoint };
