import type { CookieSameSiteEnum } from "../enum/cookie-same-site.enum.mjs";

interface CookieDescriptorInterface
{
	name: string;
	value: string;
	httpOnly?: boolean;
	secure?: boolean;
	expires?: Date;
	maxAge?: number;
	sameSite?: CookieSameSiteEnum;
	domain?: string;
	path?: string;
	partitioned?: boolean;
}

export type { CookieDescriptorInterface };
