import { TypeGuard } from "@vitruvius-labs/ts-predicate";

import { Cookie } from "../Service/Cookie.mjs";

import { ExecutionContext, Kernel } from "../index.mjs";

import { BasePreHook } from "./BasePreHook.mjs";

import type { IncomingHttpHeaders } from "node:http";

abstract class CookiePreHook extends BasePreHook
{
	/**
	 * Execute
	 */
	public execute(): void
	{
		const COOKIES: Map<string, string> | undefined = this.parseCookies();

		if (COOKIES === undefined)
		{
			return;
		}

		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		CONTEXT.getRequest().setCookies(COOKIES);
	}

	// eslint-disable-next-line class-methods-use-this -- Stateless
	private parseCookies(): Map<string, string> | undefined
	{
		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		const REQUEST_HEADERS: IncomingHttpHeaders = CONTEXT.getRequest().headers;

		if (!TypeGuard.hasProperty(REQUEST_HEADERS, "cookie") || !TypeGuard.isString(REQUEST_HEADERS.cookie))
		{
			return undefined;
		}

		const COOKIES: Map<string, string> = Cookie.Parse(REQUEST_HEADERS.cookie);

		return COOKIES;
	}
}

export { CookiePreHook };
