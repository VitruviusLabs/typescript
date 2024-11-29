/**
 * Helper for parsing cookie header.
 *
 * @internal
 * @sealed
 */
class CookieUtility
{
	/**
	 * Parse a serialized cookie header.
	 */
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

			// Will never happen, but TypeScript doesn't know that
			if (NAME === undefined || VALUE === undefined)
			{
				continue;
			}

			COOKIES.set(NAME, VALUE);
		}

		return COOKIES;
	}
}

export { CookieUtility };
