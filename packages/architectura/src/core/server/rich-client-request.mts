import type { Socket } from "node:net";
import type { JSONObjectType, JSONValueType } from "../../utility/json/_index.mjs";
import { type IncomingHttpHeaders, IncomingMessage } from "node:http";
import { type ParsedUrlQuery, parse as parseQuery } from "node:querystring";
import { isRecord as assertRecord } from "@vitruvius-labs/ts-predicate/type-assertion";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";
import { JSONUtility } from "../../utility/json/json-utility.mjs";
import { HTTPMethodEnum } from "../definition/enum/http-method.enum.mjs";
import { CookieUtility } from "../utility/cookie.utility.mjs";

class RichClientRequest extends IncomingMessage
{
	private initialized: boolean;
	private path: string;
	private pathFragments: Array<string>;
	private query: ParsedUrlQuery;
	private rawBody: Promise<Buffer>;
	private contentType: string;
	private boundary: string;
	private cookies: Map<string, string>;

	public constructor(socket: Socket)
	{
		super(socket);

		this.initialized = false;
		this.path = "";
		this.pathFragments = [];
		this.query = {};
		this.rawBody = Promise.resolve(Buffer.alloc(0));
		this.contentType = "";
		this.boundary = "";
		this.cookies = new Map();
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

			if (this.contentType.startsWith("multipart/form-data; boundary="))
			{
				this.contentType = ContentTypeEnum.FORM_DATA;

				const BOUNDARY_IDENTIFIER: string = this.contentType.replace("multipart/form-data; boundary=", "");

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

			if (SPLITTED_URL[1] !== undefined)
			{
				this.query = parseQuery(SPLITTED_URL[1]);
			}

			const PATH_FRAGMENTS: Array<string> = [];
			const SPLITTED_REQUESTED_PATH: Array<string> = this.path.split("/");

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

		this.rawBody = RichClientRequest.ListenForContent(this);
	}

	public getMethod(): string | undefined
	{
		return this.method;
	}

	public getStandardMethod(): HTTPMethodEnum | undefined
	{
		switch (this.method)
		{
			case HTTPMethodEnum.GET:
			case HTTPMethodEnum.HEAD:
			case HTTPMethodEnum.POST:
			case HTTPMethodEnum.PUT:
			case HTTPMethodEnum.DELETE:
			case HTTPMethodEnum.CONNECT:
			case HTTPMethodEnum.OPTIONS:
			case HTTPMethodEnum.TRACE:
			case HTTPMethodEnum.PATCH:
				return this.method;

			default:
				return undefined;
		}
	}

	public getURL(): string | undefined
	{
		return this.url;
	}

	public getPath(): string
	{
		return this.path;
	}

	public getPathFragments(): Array<string>
	{
		return this.pathFragments;
	}

	public getQuery(): ParsedUrlQuery
	{
		return this.query;
	}

	public getHeaders(): IncomingHttpHeaders
	{
		return structuredClone(this.headers);
	}

	public getRawHeader(name: string): Array<string> | string | undefined
	{
		const NORMALIZED_NAME: string = name.toString().toLowerCase();

		return this.headers[NORMALIZED_NAME];
	}

	public getHeader(name: string): string | undefined
	{
		const HEADER: Array<string> | string | undefined = this.getRawHeader(name);

		if (Array.isArray(HEADER))
		{
			return HEADER[0];
		}

		return HEADER;
	}

	public getNormalizedHeader(name: string): Array<string>
	{
		const NORMALIZED_NAME: string = name.toString().toLowerCase();

		return this.headersDistinct[NORMALIZED_NAME] ?? [];
	}

	public getCookie(key: string): string | undefined
	{
		return this.cookies.get(key);
	}

	public getCookies(): ReadonlyMap<string, string>
	{
		return this.cookies;
	}

	public getBoundary(): string
	{
		return this.boundary;
	}

	public getContentType(): string
	{
		return this.contentType;
	}

	public async getRawBody(): Promise<Buffer>
	{
		return await this.rawBody;
	}

	public async getBodyAsString(): Promise<string>
	{
		const RAW_BODY: Buffer = await this.getRawBody();
		const BODY_AS_STRING: string = RAW_BODY.toString();

		return BODY_AS_STRING;
	}

	public async getBodyAsJSON(): Promise<JSONObjectType>
	{
		const BODY_AS_STRING: string = await this.getBodyAsString();
		const PARSED_BODY: JSONValueType = JSONUtility.Parse(BODY_AS_STRING);

		assertRecord(PARSED_BODY);

		return PARSED_BODY;
	}
}

export { RichClientRequest };
