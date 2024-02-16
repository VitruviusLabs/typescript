import { Singleton } from "../Core/Singleton.mjs";

import type { HTTPMethodEnum } from "../Core/HTTP/HTTPMethodEnum.mjs";

import type { BasePostHook, BasePreHook } from "../index.mjs";

abstract class BaseEndpoint extends Singleton
{
	protected abstract readonly method: HTTPMethodEnum;
	protected abstract readonly route: string;
	protected readonly preHooks: Array<BasePreHook> = [];
	protected readonly excludedGlobalPreHooks: Array<BasePreHook> = [];
	protected readonly postHooks: Array<BasePostHook> = [];
	protected readonly excludedGlobalPostHooks: Array<BasePostHook> = [];

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
	public getExcludedGlobalPreHooks(): Array<BasePreHook>
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
	public getExcludedGlobalPostHooks(): Array<BasePostHook>
	{
		return this.excludedGlobalPostHooks;
	}
}

export { BaseEndpoint };
