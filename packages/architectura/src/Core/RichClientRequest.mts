import { IncomingMessage } from "node:http";

import { parse as parseQuery } from "node:querystring";

import { TypeAssertion } from "@vitruvius-labs/ts-predicate";

import { Logger } from "../index.mjs";

import { ContentTypeEnum } from "./HTTP/ContentTypeEnum.js";

import type { IncomingHttpHeaders } from "node:http";

import type { ParsedUrlQuery } from "node:querystring";

class RichClientRequest extends IncomingMessage
{
	private requestedPath: string = "";
	private pathFragments: Array<string> = [];
	private query: ParsedUrlQuery = {};
	private readonly request: ParsedUrlQuery = {};
	private rawBody: Buffer = Buffer.from("");
	private readonly body: Record<string, unknown> | string = "";
	private contentType: string = "";
	private boundary: string = "";
	private cookies: Map<string, string> = new Map<string, string>();

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
	 * initialise
	 */
	public initialise(): void
	{
		if (this.headers["content-type"] !== undefined)
		{
			this.contentType = this.headers["content-type"];

			if (this.contentType.includes(ContentTypeEnum.MULTIPART_FORM_DATA))
			{
				const SPLITTED_CONTENT_TYPE: Array<string> = this.contentType.split("=");

				if (SPLITTED_CONTENT_TYPE[0] !== undefined && SPLITTED_CONTENT_TYPE[1] !== undefined)
				{
					this.boundary = `--${SPLITTED_CONTENT_TYPE[1]}`;
				}
				else
				{
					Logger.Warning(`Received invalid multipart/form-data header: ${this.contentType}.`);
				}

				this.contentType = ContentTypeEnum.MULTIPART_FORM_DATA;
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

		const pathFragments: Array<string> = [];
		const splittedRequestedPath: Array<string> = this.requestedPath.split("/");

		for (const fragment of splittedRequestedPath)
		{
			if (fragment.length === 0)
			{
				continue;
			}

			pathFragments.push(fragment);
		}

		this.pathFragments = pathFragments;
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
				let body: Buffer = Buffer.from('');

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
	 * getBody
	 */
	public getBody(): Record<string, unknown> | string
	{
		return this.body;
	}

	public async getBodyAsString(): Promise<string>
	{
		const rawBody: Buffer = await this.getRawBody();
		const bodyAsString: string = rawBody.toString();

		return bodyAsString;
	}

	public async getBodyAsJSON(): Promise<Record<string, unknown>>
	{
		const bodyAsString: string = await this.getBodyAsString();
		const json: unknown = JSON.parse(bodyAsString);

		TypeAssertion.isRecord(json);

		return json;
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
	 * getRequest
	 */
	public getRequest(): ParsedUrlQuery
	{
		return this.request;
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

		for (const [key, value] of Object.entries(cookies))
		{
			this.cookies.set(key, value);
		}
	}

	/**
	 * getCookies
	 */
	public getCookies(): Map<string, string>
	{
		return this.cookies;
	}
}

export { RichClientRequest };
