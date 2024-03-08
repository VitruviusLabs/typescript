import type { Socket } from "node:net";
import { type IncomingHttpHeaders, IncomingMessage } from "node:http";
import { type ParsedUrlQuery, parse as parseQuery } from "node:querystring";
import { TypeAssertion } from "@vitruvius-labs/ts-predicate";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";

class RichClientRequest extends IncomingMessage
{
	private requestedPath: string;
	private pathFragments: Array<string>;
	private query: ParsedUrlQuery;
	private rawBody: Buffer;
	private contentType: string;
	private boundary: string;
	private cookies: Map<string, string>;

	public constructor(socket: Socket)
	{
		super(socket);

		this.requestedPath = "";
		this.pathFragments = [];
		this.query = {};
		this.rawBody = Buffer.from("");
		this.contentType = "";
		this.boundary = "";
		this.cookies = new Map();
	}

	/**
	 * initialise
	 */
	public initialize(): void
	{
		if (this.headers["content-type"] !== undefined)
		{
			this.contentType = this.headers["content-type"];

			if (this.contentType.includes(ContentTypeEnum.FORM_DATA))
			{
				const SPLITTED_CONTENT_TYPE: Array<string> = this.contentType.split("=");

				if (SPLITTED_CONTENT_TYPE[0] !== undefined && SPLITTED_CONTENT_TYPE[1] !== undefined)
				{
					this.boundary = `--${SPLITTED_CONTENT_TYPE[1]}`;
				}
				else
				{
					LoggerProxy.Warning(`Received invalid multipart/form-data header: ${this.contentType}.`);
				}

				this.contentType = ContentTypeEnum.FORM_DATA;
			}
		}

		if (this.url === undefined)
		{
			this.url = "";
		}

		const SPLITTED_URL: Array<string> = this.url.split("?");

		if (SPLITTED_URL[0] === undefined)
		{
			throw new Error("Unexpected error with URL splitting.");
		}

		this.requestedPath = SPLITTED_URL[0];

		if (SPLITTED_URL[1] !== undefined)
		{
			this.query = parseQuery(SPLITTED_URL[1]);
		}

		const PATH_FRAGMENTS: Array<string> = [];
		const SPLITTED_REQUESTED_PATH: Array<string> = this.requestedPath.split("/");

		for (const FRAGMENT of SPLITTED_REQUESTED_PATH)
		{
			if (FRAGMENT.length === 0)
			{
				continue;
			}

			PATH_FRAGMENTS.push(FRAGMENT);
		}

		this.pathFragments = PATH_FRAGMENTS;
	}

	/**
	 * listenForContent
	 */
	public async listenForContent(): Promise<Buffer>
	{
		if (this.complete)
		{
			return this.rawBody;
		}

		return await new Promise(
			(resolve: (value: Buffer) => void): void =>
			{
				let body: Buffer = Buffer.alloc(0);

				this.addListener(
					"data",
					(chunk: Buffer): void =>
					{
						body = Buffer.concat([body, chunk]);
					}
				);

				this.addListener(
					"end",
					(): void =>
					{
						this.complete = true;
						resolve(body);
					}
				);
			}
		);
	}

	/**
	 * getRawBody
	 */
	public async getRawBody(): Promise<Buffer>
	{
		if (!this.complete)
		{
			this.rawBody = await this.listenForContent();
		}

		return this.rawBody;
	}

	/**
	 * getBodyAsString
	 */
	public async getBodyAsString(): Promise<string>
	{
		const RAW_BODY: Buffer = await this.getRawBody();
		const BODY_AS_STRING: string = RAW_BODY.toString();

		return BODY_AS_STRING;
	}

	/**
	 * getBodyAsJSON
	 */
	public async getBodyAsJSON(): Promise<Record<string, unknown>>
	{
		const BODY_AS_STRING: string = await this.getBodyAsString();
		const PARSED_BODY: unknown = JSON.parse(BODY_AS_STRING);

		TypeAssertion.isRecord(PARSED_BODY);

		return PARSED_BODY;
	}

	/**
	 * getBoundary
	 */
	public getBoundary(): string
	{
		return this.boundary;
	}

	/**
	 * getContentType
	 */
	public getContentType(): string
	{
		return this.contentType;
	}

	/**
	 * getHeaders
	 */
	public getHeaders(): IncomingHttpHeaders
	{
		return this.headers;
	}

	/**
	 * getHeader
	 */
	public getHeader(name: keyof IncomingHttpHeaders): Array<string> | string | null
	{
		let scoped_name: string = name.toString();

		scoped_name = scoped_name.toLowerCase();

		const HEADER: Array<string> | string | undefined = this.headers[scoped_name];

		if (HEADER !== undefined)
		{
			return HEADER;
		}

		return null;
	}

	/**
	 * getQuery
	 */
	public getQuery(): ParsedUrlQuery
	{
		return this.query;
	}

	/**
	 * setQuery
	 */
	public setQuery(query: ParsedUrlQuery): void
	{
		this.query = query;
	}

	/**
	 * getRequestedPath
	 */
	public getRequestedPath(): string
	{
		return this.requestedPath;
	}

	/**
	 * getPathFragments
	 */
	public getPathFragments(): Array<string>
	{
		return this.pathFragments;
	}

	/**
	 * setCookie
	 */
	public setCookie(key: string, value: string): void
	{
		this.cookies.set(key, value);
	}

	/**
	 * getCookie
	 */
	public getCookie(key: string): string | undefined
	{
		return this.cookies.get(key);
	}

	/**
	 * setCookies
	 */
	public setCookies(cookies: Map<string, string> | Record<string, string>): void
	{
		if (cookies instanceof Map)
		{
			this.cookies = cookies;

			return;
		}

		for (const [KEY, VALUE] of Object.entries(cookies))
		{
			this.cookies.set(KEY, VALUE);
		}
	}

	/**
	 * getCookies
	 */
	public getCookies(): ReadonlyMap<string, string>
	{
		return this.cookies;
	}

	/**
	 * getNormalizedHeader
	 */
	public getNormalizedHeader(name: string): Array<string>
	{
		const HEADER: Array<string> | string | null = this.getHeader(name);

		if (HEADER === null)
		{
			return [];
		}

		if (Array.isArray(HEADER))
		{
			return HEADER;
		}

		return [HEADER];
	}
}

export { RichClientRequest };
