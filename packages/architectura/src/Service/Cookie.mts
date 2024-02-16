// @TODO: Handle homonymous cookies with different paths and domains.
class Cookie
{
	private static readonly EXTRACTION_REGEXP: RegExp = / ?(?<name>[^=]+)=(?<value>[^;]+);?/g;
	private static readonly COOKIE_NAME_PREFIX: string = 'architectura';

	/**
	 * Parse
	 *
	 * This static method will extract the cookies in the Cookie header from the request and return
	 * a Record<string, string> of each received cookie.
	 *
	 * @param {string} serialized_cookies - The content of the cookie header.
	 * @returns {Map<string, string>} - The cookies returned within a Map with the key being the cookie name and the value it's content.
	 */
	public static Parse(serialized_cookies: string): Map<string, string>
	{
		const COOKIES: Map<string, string> = new Map();

		let matched_cookies: RegExpExecArray | null = this.EXTRACTION_REGEXP.exec(serialized_cookies);

		while (matched_cookies !== null)
		{
			if (matched_cookies.groups === undefined)
			{
				break;
			}

			const NAME: string | undefined = matched_cookies.groups["name"];
			const VALUE: string | undefined = matched_cookies.groups["value"];

			if (NAME === undefined || VALUE === undefined)
			{
				break;
			}

			COOKIES.set(NAME, VALUE);

			matched_cookies = this.EXTRACTION_REGEXP.exec(serialized_cookies);
		}

		return COOKIES;
	}

	public static GetCookieNamePrefix(): string
	{
		return this.COOKIE_NAME_PREFIX;
	}
}

export { Cookie };
