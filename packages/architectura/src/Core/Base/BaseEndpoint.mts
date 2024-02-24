import { Singleton } from "../Singleton.mjs";

import type { BasePostHook, BasePreHook } from "../../index.mjs";

import type { HTTPMethodEnum } from "../HTTP/HTTPMethodEnum.mjs";

/**
 * This class is a base class for all endpoints.
 * It provides a common interface for all endpoints.
 *
 * @remarks
 * TypeScript does not allow for interfaces to have static methods.
 * This class is a workaround for that limitation.
 * It also provides a certain set of methods that all endpoints should have.
 */
abstract class BaseEndpoint extends Singleton
{
	protected abstract readonly method: HTTPMethodEnum;
	protected abstract readonly route: string;
	protected readonly preHooks: Array<BasePreHook> = [];
	protected readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [];
	protected readonly postHooks: Array<BasePostHook> = [];
	protected readonly excludedGlobalPostHooks: Array<typeof BasePostHook> = [];

	/**
	 * execute
	 */
	public abstract execute(): Promise<void> | void;

	/**
	 * getMethod
	 */
	public getMethod(): HTTPMethodEnum
	{
		return this.method;
	}

	/**
	 * getRoute
	 */
	public getRoute(): string
	{
		return this.route;
	}

	/**
	 * getPreHooks
	 */
	public getPreHooks(): Array<BasePreHook>
	{
		return this.preHooks;
	}

	/**
	 * getExcludedGlobalPreHooks
	 */
	public getExcludedGlobalPreHooks(): Array<typeof BasePreHook>
	{
		return this.excludedGlobalPreHooks;
	}

	/**
	 * getPostHooks
	 */
	public getPostHooks(): Array<BasePostHook>
	{
		return this.postHooks;
	}

	/**
	 * getExcludedGlobalPostHooks
	 */
	public getExcludedGlobalPostHooks(): Array<typeof BasePostHook>
	{
		return this.excludedGlobalPostHooks;
	}
}

export { BaseEndpoint };
