// import type { Socket } from "net";
import { IncomingMessage } from "node:http";

import { parse as parseQuery } from "node:querystring";

import type { ClientRequestFileInterface } from "./ClientRequest/ClientRequestFileInterface.mjs";

import type { IncomingHttpHeaders } from "node:http";

import type { ParsedUrlQuery } from "node:querystring";

class ClientRequest extends IncomingMessage
{
	private requestedPath: string = "";
	private pathFragments: Array<string> = [];
	private query: ParsedUrlQuery = {};
	private request: ParsedUrlQuery = {};
	private rawBody: string = "";
	private body: Record<string, unknown>|string = "";
	// private readonly headers: IncomingHttpHeaders;
	private contentType: string = "";
	private boundary: string = "";
	private cookies: Map<string, string> = new Map<string, string>();

	/**
	 * getRawBody
	 */
	public getRawBody(): string
	{
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

			if (this.contentType.includes("multipart/form-data;"))
			{
				const SPLITTED_CONTENT_TYPE: Array<string> = this.contentType.split("=");

				if (SPLITTED_CONTENT_TYPE[0] !== undefined && SPLITTED_CONTENT_TYPE[1] !== undefined)
				{
					this.boundary = `--${SPLITTED_CONTENT_TYPE[1]}`;
				}
				else
				{
					//TODO Log the error of received header
				}

				this.contentType = "multipart/form-data";
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

		let path_fragments: Array<string> = this.requestedPath.split("/");

		path_fragments = path_fragments.filter(
			(value: string): boolean =>
			{
				return value.length !== 0;
			}
		);

		this.pathFragments = path_fragments;
	}

	/**
	 * listenForContent
	 */
	public async listenForContent(): Promise<string>
	{
		return await new Promise(
			(resolve: (value: PromiseLike<string> | string) => void): void =>
			{
				let body: string = "";

				this.addListener(
					"data",
					(chunk: Buffer): void =>
					{
						body += chunk.toString("binary");
					}
				);

				this.addListener(
					"end",
					(): void =>
					{
						resolve(body);
					}
				);
			}
		);
	}

	/**
	 * setRawBody
	 */
    // @TODO: Reduce the cognitive complexity by separating the processes in sub methods.
    // eslint-disable-next-line sonarjs/cognitive-complexity -- This is a temporary solution.
	public setRawBody(value: string): void
	{
		this.rawBody = value;

		switch (this.getContentType())
		{
			case "application/json":

				try
				{
					this.body = JSON.parse(this.rawBody) as Record<string, unknown>;
				}
				catch
				{
					//TODO: Add error log here
				}

			break;

			case "application/x-www-form-urlencoded":

				this.request = parseQuery(this.rawBody);

			break;

			case "multipart/form-data":

                // @TODO: This needs to be investigated ASAP as it is not working at all and the logic is not ideal
                // since we are waiting for the full content whilst we may need to pipe the stream.
                // eslint-disable-next-line no-case-declarations -- This is a temporary solution.
				const PARTS: Array<string> = this.rawBody.split(this.boundary);
                // eslint-disable-next-line no-case-declarations, sonarjs/no-unused-collection -- This is a temporary solution.
				const FILES: Array<ClientRequestFileInterface> = [];

				PARTS.forEach(
					(part: string, index: number): void =>
					{
						if (index !== 0 && index < PARTS.length - 1)
						{
							const NAME_MATCHES: RegExpExecArray|null = /name="(?<name>[^"]+)";?\s+/i.exec(part);
							let name: string = "";

							if (NAME_MATCHES !== null && NAME_MATCHES[1] !== undefined)
							{
								name = NAME_MATCHES[1].trim();
							}

							const FILENAME_MATCHES: RegExpExecArray|null = /filename="(?<filename>[^\n]+)";?\s+/i.exec(part);
							let filename: string = "";

							if (FILENAME_MATCHES !== null && FILENAME_MATCHES[1] !== undefined)
							{
								filename = FILENAME_MATCHES[1].trim();
							}

							const CONTENT_TYPE_MATCHES: RegExpExecArray|null = /Content-Type: (?<contentType>[^\s]+)\s+/i.exec(part);
							let content_type: string = "";

							if (CONTENT_TYPE_MATCHES !== null && CONTENT_TYPE_MATCHES.groups?.['contentType'] !== undefined)
							{
								content_type = CONTENT_TYPE_MATCHES.groups['contentType'].trim();
							}

							// Splitting on double Carriage Return + Line Feed is the distinctive point between preamble and content.
							const SPLITTED_PART: Array<string> = part.split("\r\n\r\n");

							if (SPLITTED_PART[1] === undefined)
							{
								throw new Error("Invalid multipart/form-data body received.");
							}

							if (filename === "")
							{
								this.request[name] = SPLITTED_PART[1];
							}
							else
							{
								FILES.push(
									{
										name: filename,
										mimeType: content_type,
										content: SPLITTED_PART[1]
									}
								);
							}
						}
					}
				);

			break;

			default:

				this.body = this.rawBody;

			break;
		}
	}

	/**
	 * getBody
	 */
	public getBody(): Record<string, unknown>|string
	{
		return this.body;
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
	public setCookie(key: string, value: string): void {
		this.cookies.set(key, value);
	}

	/**
	 * getCookie
	 */
	public getCookie(key: string): string|undefined {
		return this.cookies.get(key);
	}

	/**
	 * setCookies
	 */
	public setCookies(cookies: Map<string, string> | Record<string, string>): void {
		if (cookies instanceof Map) {
			this.cookies = cookies;

			return;
		}

		for (const [key, value] of Object.entries(cookies)) {
			this.cookies.set(key, value);
		}
	}

	/**
	 * getCookies
	 */
	public getCookies(): Map<string, string> {
		return this.cookies;
	}
}

export { ClientRequest };
