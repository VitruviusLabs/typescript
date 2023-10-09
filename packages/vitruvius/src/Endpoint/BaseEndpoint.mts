import { HTTPMethodEnum } from "../Core/HTTP/HTTPMethodEnum.mjs";

import type { BaseMiddleware } from "../Middleware/BaseMiddleware.mjs";

abstract class BaseEndpoint
{
	protected static readonly METHOD: HTTPMethodEnum = HTTPMethodEnum.GET;
	protected static readonly ROUTE: string = "/";
	protected static readonly MIDDLEWARES: Array<typeof BaseMiddleware> = [];

	public static async Execute(): Promise<void>
	// eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a dummy method that will be replaced when the class is extended.
	{}

	public static GetMethod(): HTTPMethodEnum
	{
		return this.METHOD;
	}

	public static GetRoute(): string
	{
		return this.ROUTE;
	}

	/**
	 * GetMiddleware
	 */
	public static GetMiddlewares(): Array<typeof BaseMiddleware>
	{
		return this.MIDDLEWARES;
	}
}

export { BaseEndpoint };
