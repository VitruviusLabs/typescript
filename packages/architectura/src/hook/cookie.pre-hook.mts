import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { ExecutionContext } from "../core/execution-context/execution-context.mjs";
import { CookieService } from "../service/cookie/cookie.service.mjs";
import { BasePreHook } from "./base.pre-hook.mjs";

abstract class CookiePreHook extends BasePreHook
{
	/**
	 * Execute
	 */
	public execute(context: ExecutionContext): void
	{
		const COOKIES: Map<string, string> | undefined = this.parseCookies(context);

		if (COOKIES === undefined)
		{
			return;
		}

		context.getRequest().setCookies(COOKIES);
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- Stateless
	private parseCookies(context: ExecutionContext): Map<string, string> | undefined
	{
		const COOKIE_HEADER: unknown = context.getRequest().getHeader("Cookie");

		if (!TypeGuard.isString(COOKIE_HEADER))
		{
			return undefined;
		}

		const COOKIES: Map<string, string> = CookieService.Parse(COOKIE_HEADER);

		return COOKIES;
	}
}

export { CookiePreHook };
