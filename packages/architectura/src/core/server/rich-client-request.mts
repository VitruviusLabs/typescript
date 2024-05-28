import type { Socket } from "node:net";
import type { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import { type IncomingHttpHeaders, IncomingMessage } from "node:http";
import { type ParsedUrlQuery, parse as parseQuery } from "node:querystring";
import { type JSONObjectType, type JSONValueType, jsonDeserialize } from "@vitruvius-labs/toolbox";
import { assertRecord } from "@vitruvius-labs/ts-predicate/type-assertion";
import { isArray } from "@vitruvius-labs/ts-predicate/type-guard";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";
import { CookieUtility } from "../utility/cookie.utility.mjs";
import { isHTTPMethodEnum } from "../predicate/is-http-method-enum.mjs";

/**
 * Rich client request.
 */
class RichClientRequest extends IncomingMessage
{
	private readonly pathMatchGroups: Record<string, string> | undefined;
	private initialized: boolean;
	private cookies: Map<string, string>;
	private path: string | undefined;
	private pathFragments: Array<string>;
	private query: ParsedUrlQuery;
	private contentType: string | undefined;
	private boundary: string | undefined;
	private rawBody: Promise<Buffer>;

	/**
	 * Create a new rich client request.
	 *
	 * @internal
	 */
	public constructor(socket: Socket)
	{
		super(socket);

		this.pathMatchGroups = undefined;
		this.initialized = false;
		this.cookies = new Map();
		this.path = undefined;
		this.pathFragments = [];
		this.query = {};
		this.contentType = undefined;
		this.boundary = undefined;
		this.rawBody = Promise.resolve(Buffer.alloc(0));
	}

	private static async ListenForContent(message: IncomingMessage): Promise<Buffer>
	{
		return await new Promise(
			(resolve: (value: Buffer) => void, reject: (reason: Error) => void): void =>
			{
				let body: Buffer = Buffer.alloc(0);

				message.addListener(
					"data",
					(chunk: Buffer): void =>
					{
						body = Buffer.concat([body, chunk]);
					}
				);

				message.addListener(
					"end",
					(): void =>
					{
						if (!message.complete)
						{
							reject(new Error("The connection was terminated while the message was still being sent."));

							return;
						}

						resolve(body);
					}
				);

				message.addListener(
					"error",
					(error: Error): void =>
					{
						reject(error);
					}
				);
			}
		);
	}

	/**
	 * Initialize the request.
	 *
	 * @internal
	 */
	public initialize(): void
	{
		if (this.initialized)
		{
			throw new Error("The request has already been initialized.");
		}

		this.initialized = true;

		const CONTENT_TYPE_HEADER: string | undefined = this.getHeader("Content-Type");

		if (CONTENT_TYPE_HEADER !== undefined)
		{
			this.contentType = CONTENT_TYPE_HEADER;

			if (CONTENT_TYPE_HEADER.startsWith("multipart/form-data; boundary="))
			{
				this.contentType = ContentTypeEnum.FORM_DATA;

				const BOUNDARY_IDENTIFIER: string = CONTENT_TYPE_HEADER.replace("multipart/form-data; boundary=", "");

				if (BOUNDARY_IDENTIFIER.length === 0)
				{
					throw new Error(`Received invalid multipart/form-data header: ${this.contentType}.`);
				}

				this.boundary = `--${BOUNDARY_IDENTIFIER}`;
			}
		}

		const COOKIE_HEADER: string | undefined = this.getHeader("Cookie");

		if (COOKIE_HEADER !== undefined)
		{
			this.cookies = CookieUtility.ParseCookies(COOKIE_HEADER);
		}

		if (this.url !== undefined)
		{
			const SPLITTED_URL: Array<string> = this.url.split("?");

			if (SPLITTED_URL[0] === undefined)
			{
				throw new Error("Unexpected error with URL splitting.");
			}

			this.path = SPLITTED_URL[0];

			if (this.path.length > 1 && this.path.endsWith("/"))
			{
				this.path = this.path.slice(0, -1);
			}

			this.pathFragments = this.path.split("/").filter(
				(fragment: string): boolean =>
				{
					return fragment.length > 0;
				}
			);

			if (SPLITTED_URL[1] !== undefined)
			{
				this.query = parseQuery(SPLITTED_URL[1]);
			}
		}

		this.rawBody = RichClientRequest.ListenForContent(this);
	}

	/**
	 * Get the raw method.
	 *
	 * @remarks
	 * This method should be avoided outside debugging and logging.
	 */
	public getUnsafeMethod(): string | undefined
	{
		return this.method;
	}

	/**
	 * Check if it has a standard method.
	 */
	public hasStandardMethod(): boolean
	{
		return isHTTPMethodEnum(this.method);
	}

	/**
	 * Get the method.
	 *
	 * @throws if the request has no method or a non-standard method.
	 */
	public getMethod(): HTTPMethodEnum
	{
		if (isHTTPMethodEnum(this.method))
		{
			return this.method;
		}

		if (this.method === undefined)
		{
			throw new Error("This request has no method.");
		}

		throw new Error(`Non standard HTTP method: ${this.method}.`);
	}

	/**
	 * Get the raw URL.
	 *
	 * @remarks
	 * This method should be avoided outside debugging and logging.
	 */
	public getUnsafeURL(): string | undefined
	{
		return this.url;
	}

	/**
	 * Check if there is an URL.
	 */
	public hasURL(): boolean
	{
		return this.url !== undefined;
	}

	/**
	 * Get the URL.
	 *
	 * @throws if the request has no URL.
	 */
	public getURL(): string
	{
		if (this.url === undefined)
		{
			throw new Error("This request has no URL.");
		}

		return this.url;
	}

	/**
	 * Get the raw URL path.
	 *
	 * @remarks
	 * This method should be avoided outside debugging and logging.
	 */
	public getUnsafePath(): string | undefined
	{
		return this.path;
	}

	/**
	 * Check if there is an URL path.
	 */
	public hasPath(): boolean
	{
		return this.path !== undefined;
	}

	/**
	 * Get the URL path.
	 */
	public getPath(): string
	{
		if (this.path === undefined)
		{
			throw new Error("This request has no path.");
		}

		return this.path;
	}

	/**
	 * Get the path parts for this request.
	 */
	public getPathFragments(): Array<string>
	{
		return this.pathFragments;
	}

	/**
	 * Get the path match groups for this request.
	 *
	 * @remarks
	 * Correspond to the capturing groups in the endpoint route that matched the request.
	 */
	public getPathMatchGroups(): Record<string, string>
	{
		return this.pathMatchGroups ?? {};
	}

	/**
	 * Get the parsed URL query.
	 */
	public getQuery(): ParsedUrlQuery
	{
		return this.query;
	}

	/**
	 * Check if the specified query item exists.
	 */
	public hasQueryItem(name: string): boolean
	{
		return Object.hasOwn(this.query, name);
	}

	/**
	 * Get all the values associated with the specified query item.
	 */
	public getQueryItemAll(name: string): Array<string>
	{
		const VALUE: Array<string> | string | undefined = this.query[name];

		if (VALUE === undefined)
		{
			return [];
		}

		if (isArray(VALUE))
		{
			return VALUE;
		}

		return [VALUE];
	}

	/**
	 * Get the first value associated with the specified query item.
	 */
	public getQueryItem(name: string): string | undefined
	{
		const VALUE: Array<string> | string | undefined = this.query[name];

		if (isArray(VALUE))
		{
			return VALUE[0];
		}

		return VALUE;
	}

	/**
	 * Get the raw headers
	 */
	public getRawHeaders(): Record<string, Array<string> | undefined>
	{
		return this.headersDistinct;
	}

	/**
	 * Get the processed headers
	 *
	 * @remarks
	 * Duplicates of `age`, `authorization`, `content-length`, `content-type`,`etag`, `expires`, `from`, `host`, `if-modified-since`, `if-unmodified-since`,`last-modified`, `location`,
	 * `max-forwards`, `proxy-authorization`, `referer`,`retry-after`, `server`, or `user-agent` are discarded.
	 * For the `set-cookie` header, it is always an array, duplicates are added to the array.
	 * For duplicate `cookie` headers, the values are joined together with `; `.
	 * For all other headers, the values are joined together with `, `.
	 */
	public getHeaders(): IncomingHttpHeaders
	{
		return this.headers;
	}

	/**
	 * Check if the specified header exists.
	 */
	public hasHeader(name: string): boolean
	{
		const NORMALIZED_NAME: string = name.toString().toLowerCase();

		return Object.hasOwn(this.headersDistinct, NORMALIZED_NAME);
	}

	/**
	 * Get the specified raw header.
	 */
	public getRawHeader(name: string): Array<string>
	{
		const NORMALIZED_NAME: string = name.toString().toLowerCase();

		return this.headersDistinct[NORMALIZED_NAME] ?? [];
	}

	/**
	 * Get the specified processed header.
	 */
	public getHeader(name: "Set-Cookie" | "set-cookie"): Array<string>;
	public getHeader(name: string): string | undefined;
	public getHeader(name: string): Array<string> | string | undefined
	{
		const NORMALIZED_NAME: string = name.toString().toLowerCase();

		const HEADER: Array<string> | string | undefined = this.headers[NORMALIZED_NAME];

		if (NORMALIZED_NAME === "set-cookie")
		{
			return HEADER ?? [];
		}

		return HEADER;
	}

	/**
	 * Get the cookies.
	 */
	public getCookies(): Map<string, string>
	{
		return this.cookies;
	}

	/**
	 * Check if the specified cookie exists.
	 */
	public hasCookie(key: string): boolean
	{
		return this.cookies.has(key);
	}

	/**
	 * Get the specified cookie.
	 */
	public getCookie(key: string): string | undefined
	{
		return this.cookies.get(key);
	}

	/**
	 * Get the boundary.
	 *
	 * @remarks
	 */
	public getBoundary(): string | undefined
	{
		return this.boundary;
	}

	/**
	 * Get the content type.
	 */
	public getContentType(): string | undefined
	{
		return this.contentType;
	}

	/**
	 * Get the raw body.
	 */
	public async getRawBody(): Promise<Buffer>
	{
		return await this.rawBody;
	}

	/**
	 * Get the body as a string.
	 */
	public async getBodyAsString(): Promise<string>
	{
		const RAW_BODY: Buffer = await this.getRawBody();
		const BODY_AS_STRING: string = RAW_BODY.toString();

		return BODY_AS_STRING;
	}

	/**
	 * Get the body as JSON object.
	 *
	 * @throws if the body cannot be parsed into a valid JSON object.
	 */
	public async getBodyAsJSON(): Promise<JSONObjectType>
	{
		const BODY_AS_STRING: string = await this.getBodyAsString();
		const PARSED_BODY: JSONValueType = jsonDeserialize(BODY_AS_STRING);

		assertRecord(PARSED_BODY);

		return PARSED_BODY;
	}

	/* @TODO: Add support for multipart body */
	/**
	 * @throws if the request doesn't have a multipart body.
	 */
	/*
	public async getBodyAsMultipart(): Promise<unknown>
	{
		if (this.boundary === undefined)
		{
			throw new Error("This request does not have a multipart body.");
		}

		const BODY_AS_STRING: string = await this.getBodyAsString();

		return MultipartUtility.Parse(BODY_AS_STRING.split(this.boundary));
	}
	*/
}

export { RichClientRequest };
