import { Singleton } from "../Core/Singleton.mjs";

import type { HTTPMethodEnum } from "../Core/HTTP/HTTPMethodEnum.mjs";

import type { BasePostHook, BasePreHook } from "../index.mjs";

abstract class BaseEndpoint extends Singleton
{
	protected abstract readonly method: HTTPMethodEnum;
	protected abstract readonly route: string;
	protected readonly preHooks: Array<typeof BasePreHook> = [];
	protected readonly excludedGlobalPreHooks: Array<typeof BasePreHook> = [];
	protected readonly postHooks: Array<typeof BasePostHook> = [];
	protected readonly excludedGlobalPostHooks: Array<typeof BasePostHook> = [];

	/**
	 * execute
	 */
	public abstract execute(): Promise<void>;

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
	public getPreHooks(): Array<typeof BasePreHook>
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
	public getPostHooks(): Array<typeof BasePostHook>
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
