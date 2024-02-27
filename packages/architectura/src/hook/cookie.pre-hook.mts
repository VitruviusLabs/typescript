import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";
import { ExecutionContextRegistry } from "../core/execution-context/execution-context.registry.mjs";
import { CookieService } from "../service/cookie/cookie.service.mjs";
import { BasePreHook } from "./base.pre-hook.mjs";
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

		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

		CONTEXT.getRequest().setCookies(COOKIES);
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Stateless
	private parseCookies(): Map<string, string> | undefined
	{
		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

		const REQUEST_HEADERS: IncomingHttpHeaders = CONTEXT.getRequest().headers;

		if (!TypeGuard.hasProperty(REQUEST_HEADERS, "cookie") || !TypeGuard.isString(REQUEST_HEADERS.cookie))
		{
			return undefined;
		}

		const COOKIES: Map<string, string> = CookieService.Parse(REQUEST_HEADERS.cookie);

		return COOKIES;
	}
}

export { CookiePreHook };
