import type { ExecutionContext } from "../../core/execution-context/execution-context.mjs";
import { TypeGuard } from "@vitruvius-labs/ts-predicate";

class CookieUtility
{
	public static ParseCookies(serialized_cookies: string): Map<string, string>
	{
		const EXTRACTION_REGEXP: RegExp = /^(?<name>[^=]+)=(?<value>.+)$/;

		const COOKIES: Map<string, string> = new Map();

		for (const SERIALIZED_COOKIE of serialized_cookies.split("; "))
		{
			const MATCHES: RegExpExecArray | null = EXTRACTION_REGEXP.exec(SERIALIZED_COOKIE);

			if (MATCHES?.groups === undefined)
			{
				continue;
			}

			const NAME: string | undefined = MATCHES.groups["name"];
			const VALUE: string | undefined = MATCHES.groups["value"];

			if (NAME === undefined || VALUE === undefined)
			{
				continue;
			}

			COOKIES.set(NAME, VALUE);
		}

		return COOKIES;
	}

	public static ExtractCookies(context: ExecutionContext): Map<string, string> | undefined
	{
		const COOKIE_HEADER: unknown = context.getRequest().getHeader("Cookie");

		if (!TypeGuard.isString(COOKIE_HEADER))
		{
			return undefined;
		}

		return this.ParseCookies(COOKIE_HEADER);
	}
}

export { CookieUtility };
