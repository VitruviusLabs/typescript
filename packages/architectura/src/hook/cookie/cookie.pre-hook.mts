import type { ExecutionContext } from "../../core/execution-context/execution-context.mjs";
import { BasePreHook } from "../../core/hook/base.pre-hook.mjs";
import { CookieUtility } from "./cookie.utility.mjs";

class CookiePreHook extends BasePreHook
{
	public override execute(context: ExecutionContext): void
	{
		const COOKIES: Map<string, string> | undefined = CookieUtility.ExtractCookies(context);

		if (COOKIES === undefined)
		{
			return;
		}

		context.getRequest().setCookies(COOKIES);
	}
}

export { CookiePreHook };
