import { TypeGuard } from "@vitruvius-lab/ts-predicate";

import { Cookie } from "../Service/Cookie.mjs";

import { ExecutionContext } from "../index.mjs";

import { BaseMiddleware } from "./BaseMiddleware.mjs";

import type { IncomingHttpHeaders } from "node:http";

abstract class CookieMiddleware extends BaseMiddleware
{
	/**
	 * Execute
	 */
	// eslint-disable-next-line @typescript-eslint/require-await -- This is a temporary solution.
	public static override async Execute(): Promise<void>
	{
		const COOKIES: Map<string, string>|undefined = this.ParseCookies();

		if (COOKIES === undefined) {
			return;
		}

		ExecutionContext.GetRequest()?.setCookies(COOKIES);
	}

	private static ParseCookies(): Map<string, string>|undefined
	{
		const REQUEST_HEADERS: IncomingHttpHeaders|undefined = ExecutionContext.GetRequest()?.headers;

		if (REQUEST_HEADERS === undefined)
		{
			return undefined;
		}

		if (!TypeGuard.hasProperty(REQUEST_HEADERS, "cookie") || !TypeGuard.isString(REQUEST_HEADERS.cookie))
		{
			return undefined;
		}

		const COOKIES: Map<string, string> = Cookie.Extract(REQUEST_HEADERS.cookie);

		return COOKIES;
	}
}

export { CookieMiddleware };
