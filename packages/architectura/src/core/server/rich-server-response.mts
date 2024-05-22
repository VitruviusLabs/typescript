import type { Transform } from "node:stream";
import type { RichClientRequest } from "./rich-client-request.mjs";
import type { ReplyInterface } from "./definition/interface/reply.interface.mjs";
import type { CookieDescriptorInterface } from "./definition/interface/cookie-descriptor.interface.mjs";
import { TLSSocket } from "node:tls";
import { pipeline } from "node:stream/promises";
import { ServerResponse as HTTPServerResponse } from "node:http";
import { createBrotliCompress, createDeflate, createGzip } from "node:zlib";
import { isNumber, isRecord, isString } from "@vitruvius-labs/ts-predicate/type-guard";
import { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";
import { CookieSameSiteEnum } from "./definition/enum/cookie-same-site.enum.mjs";
import { ContentEncodingEnum } from "./definition/enum/content-encoding.enum.mjs";
import { JSONUtility } from "../../utility/json/json-utility.mjs";
import { LoggerProxy } from "../../service/logger/logger.proxy.mjs";
import { isErrorWithCode } from "../../predicate/is-error-with-code.mjs";

/**
 * Rich server response.
 */
class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private readonly cookies: Map<string, CookieDescriptorInterface>;
	private content: Buffer | string | undefined;
	private locked: boolean;
	private processed: boolean;

	/**
	 * Create a new rich server response.
	 *
	 * @internal
	 */
	public constructor(request: RichClientRequest)
	{
		super(request);

		this.cookies = new Map();
		this.content = undefined;
		this.locked = false;
		this.processed = false;
	}

	private static GetEncoder(encoding: ContentEncodingEnum): Transform
	{
		switch (encoding)
		{
			case ContentEncodingEnum.GZIP:
				return createGzip();

			case ContentEncodingEnum.BROTLI:
				return createBrotliCompress();

			case ContentEncodingEnum.DEFLATE:
				return createDeflate();
		}
	}

	/**
	 * Send a JSON payload as response.
	 *
	 * @remarks
	 * Locks the response to prevent further modifications.
	 *
	 * The response will have a status code of 200 because no issue with HTTP occurred.
	 * If you want to represent a non-HTTP error, set relevant properties in the content.
	 *
	 * @see {@link RichServerResponse.replyWith | replyWith}
	 */
	public async json(content: unknown): Promise<void>
	{
		await this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: content,
			contentType: ContentTypeEnum.JSON,
		});
	}

	/**
	 * Send a plain text payload as response.
	 *
	 * @remarks
	 * Locks the response to prevent further modifications.
	 *
	 * @see {@link RichServerResponse.replyWith | replyWith}
	 */
	public async text(content: Buffer | string): Promise<void>
	{
		await this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: content,
			contentType: ContentTypeEnum.TEXT,
		});
	}

	/**
	 * Send a response.
	 *
	 * @remarks
	 * Locks the response to prevent further modifications.
	 *
	 * @throws if the response is locked.
	 */
	public async replyWith(parameters: HTTPStatusCodeEnum | ReplyInterface): Promise<void>
	{
		this.assertUnlocked();

		this.locked = true;

		if (isNumber(parameters))
		{
			this.statusCode = parameters;
			this.processCookieHeader();
			await this.writePayload();

			return;
		}

		this.statusCode = parameters.status ?? HTTPStatusCodeEnum.OK;

		this.processHeaders(parameters);
		this.processCookies(parameters);
		this.processContentType(parameters);
		this.processPayload(parameters);
		this.processCookieHeader();
		await this.writePayload();
	}

	/**
	 * Check if the response is locked.
	 *
	 * @remarks
	 * It can be used to know when the getters will return the final values.
	 */
	public isLocked(): boolean
	{
		return this.locked;
	}

	/**
	 * Check if the response is processed.
	 */
	public isProcessed(): boolean
	{
		return this.processed;
	}

	/**
	 * Check if the response has content.
	 */
	public hasContent(): boolean
	{
		return this.content !== undefined;
	}

	/**
	 * Get the content as-is.
	 *
	 * @remarks
	 * This method should be avoided outside debugging and logging.
	 */
	public getUnsafeContent(): Buffer | string | undefined
	{
		return this.content;
	}

	/**
	 * Get the content as a buffer.
	 */
	public getRawContent(): Buffer
	{
		if (this.content instanceof Buffer)
		{
			return this.content;
		}

		if (this.content === undefined)
		{
			return Buffer.alloc(0);
		}

		return Buffer.from(this.content);
	}

	/**
	 * Get the content as a string.
	 */
	public getContent(): string
	{
		if (this.content instanceof Buffer)
		{
			return this.content.toString();
		}

		return this.content ?? "";
	}

	/**
	 * Set the content.
	 *
	 * @remarks
	 * This method should be avoided, prefer the use of {@link RichServerResponse.replyWith | replyWith}
	 *
	 * @throws if the response is locked.
	 */
	public setContent(content: Buffer | string): void
	{
		this.assertUnlocked();

		this.content = content;
	}

	/**
	 * Get the status code.
	 */
	public getStatusCode(): HTTPStatusCodeEnum
	{
		return this.statusCode;
	}

	/**
	 * Set the status code.
	 *
	 * @remarks
	 * This method should be avoided, prefer the use of {@link RichServerResponse.replyWith | replyWith}
	 *
	 * @throws if the response is locked.
	 */
	public setStatusCode(status_code: HTTPStatusCodeEnum): void
	{
		this.assertUnlocked();

		this.statusCode = status_code;
	}

	/**
	 * Get the specified header.
	 *
	 * @remarks
	 * This method should be avoided outside debugging and logging.
	 */
	public getHeaderRaw(name: string): Array<string> | number | string | undefined
	{
		return super.getHeader(name.toLowerCase());
	}

	/**
	 * Get an array of all the headers associated with the specified name.
	 */
	public getHeaderAll(name: string): Array<string>
	{
		const HEADER: Array<string> | number | string | undefined = this.getHeaderRaw(name);

		if (HEADER === undefined)
		{
			return [];
		}

		if (Array.isArray(HEADER))
		{
			return HEADER;
		}

		if (isNumber(HEADER))
		{
			return [HEADER.toString()];
		}

		return [HEADER];
	}

	/**
	 * Get the first header associated with the specified name.
	 */
	public override getHeader(name: string): string | undefined
	{
		return this.getHeaderAll(name)[0];
	}

	/**
	 * Set a cookie.
	 *
	 * @remarks
	 * This method should be avoided, prefer the use of {@link RichServerResponse.replyWith | replyWith}
	 *
	 * @throws if the response is locked.
	 */
	public setCookie(descriptor: CookieDescriptorInterface): void
	{
		this.assertUnlocked();

		if (descriptor.expires !== undefined && descriptor.maxAge !== undefined)
		{
			throw new Error("A cookie can't have both an expires and max-age attribute.");
		}

		if (descriptor.sameSite === CookieSameSiteEnum.None && !(descriptor.secure ?? this.isSecure()))
		{
			throw new Error("A cookie can't have the attribute SameSite equals to None without the attribute Secure.");
		}

		this.cookies.set(descriptor.name, descriptor);
	}

	private assertUnlocked(): void
	{
		if (this.locked)
		{
			throw new Error("This response is locked and will no longer accept changes.");
		}
	}

	private isSecure(): boolean
	{
		return this.req.socket instanceof TLSSocket;
	}

	private computeCookieAttributes(descriptor: CookieDescriptorInterface): string
	{
		const ATTRIBUTES: Array<string> = [];

		if (descriptor.httpOnly ?? true)
		{
			ATTRIBUTES.push("HttpOnly");
		}

		if (descriptor.secure ?? this.isSecure())
		{
			ATTRIBUTES.push("Secure");
		}

		if (descriptor.expires !== undefined)
		{
			ATTRIBUTES.push(`Expires=${descriptor.expires.toUTCString()}`);
		}

		if (descriptor.maxAge !== undefined)
		{
			ATTRIBUTES.push(`Max-Age=${descriptor.maxAge.toString()}`);
		}

		if (descriptor.sameSite !== undefined)
		{
			ATTRIBUTES.push(`SameSite=${descriptor.sameSite}`);
		}

		if (descriptor.domain !== undefined)
		{
			ATTRIBUTES.push(`Domain=${descriptor.domain}`);
		}

		if (descriptor.path !== undefined)
		{
			ATTRIBUTES.push(`Path=${descriptor.path}`);
		}

		if (descriptor.partitioned ?? false)
		{
			ATTRIBUTES.push("Partitioned");
		}

		if (ATTRIBUTES.length === 0)
		{
			return "";
		}

		return `; ${ATTRIBUTES.join("; ")}`;
	}

	private processHeaders(parameters: ReplyInterface): void
	{
		if (parameters.headers === undefined)
		{
			return;
		}

		// @ts-expect-error: Map is a valid initializer for Headers
		const HEADERS: Headers = new Headers(parameters.headers);

		HEADERS.forEach(
			(value: string, header: string): void =>
			{
				this.setHeader(header, value);
			}
		);
	}

	private processCookies(parameters: ReplyInterface): void
	{
		if (parameters.cookies === undefined)
		{
			return;
		}

		parameters.cookies.forEach(
			(descriptor: CookieDescriptorInterface): void =>
			{
				this.setCookie(descriptor);
			}
		);
	}

	private processContentType(parameters: ReplyInterface): void
	{
		if (parameters.payload === undefined)
		{
			return;
		}

		if (parameters.contentType !== undefined)
		{
			this.setHeader("Content-Type", parameters.contentType);

			return;
		}

		if (isRecord(parameters.payload))
		{
			this.setHeader("Content-Type", ContentTypeEnum.JSON);

			return;
		}

		this.setHeader("Content-Type", ContentTypeEnum.TEXT);
	}

	private processPayload(parameters: ReplyInterface): void
	{
		if (isString(parameters.payload) || parameters.payload instanceof Buffer)
		{
			this.content = parameters.payload;

			return;
		}

		this.content = JSONUtility.Encode(parameters.payload);
	}

	private processCookieHeader(): void
	{
		if (this.cookies.size === 0)
		{
			return;
		}

		const COOKIE_HEADER: Array<string> = [];

		this.cookies.forEach(
			(descriptor: CookieDescriptorInterface): void =>
			{
				const ATTRIBUTES: string = this.computeCookieAttributes(descriptor);

				const COOKIE: string = `${descriptor.name}=${descriptor.value}${ATTRIBUTES}`;

				COOKIE_HEADER.push(COOKIE);
			}
		);

		this.setHeader("Set-Cookie", COOKIE_HEADER);
	}

	private async writePayload(): Promise<void>
	{
		if (this.content === undefined)
		{
			this.end();
			this.processed = true;

			return;
		}

		const ENCODING: ContentEncodingEnum | undefined = this.findAcceptedEncoding();

		if (ENCODING === undefined)
		{
			this.write(this.content);
			this.end();
			this.processed = true;

			return;
		}

		this.setHeader("Content-Encoding", ENCODING);
		const ENCODER: Transform = RichServerResponse.GetEncoder(ENCODING);

		const PROMISE: Promise<void> = pipeline(ENCODER, this);

		ENCODER.write(this.content);
		ENCODER.end();

		try
		{
			await PROMISE;
		}
		catch (error: unknown)
		{
			if (isErrorWithCode(error) && error.code === "ERR_STREAM_PREMATURE_CLOSE")
			{
				LoggerProxy.Warning("Premature response close");
			}
			else
			{
				// eslint-disable-next-line @typescript-eslint/no-throw-literal -- Rethrow as is
				throw error;
			}
		}
		finally
		{
			this.processed = true;
		}
	}

	private findAcceptedEncoding(): ContentEncodingEnum | undefined
	{
		const ACCEPT_ENCODING_HEADER: string | undefined = this.req.getHeader("accept-encoding");

		if (ACCEPT_ENCODING_HEADER === undefined)
		{
			return undefined;
		}

		const ACCEPTED_ENCODINGS: Array<string> = ACCEPT_ENCODING_HEADER.split(", ");

		for (const RAW_ACCEPTED_ENCODING of ACCEPTED_ENCODINGS)
		{
			const ACCEPTED_ENCODING: string | undefined = RAW_ACCEPTED_ENCODING.split(";")[0];

			if (ACCEPTED_ENCODING === ContentEncodingEnum.GZIP)
			{
				return ContentEncodingEnum.GZIP;
			}

			if (ACCEPTED_ENCODING === ContentEncodingEnum.BROTLI)
			{
				return ContentEncodingEnum.BROTLI;
			}

			if (ACCEPTED_ENCODING === ContentEncodingEnum.DEFLATE)
			{
				return ContentEncodingEnum.DEFLATE;
			}
		}

		return undefined;
	}
}

export { RichServerResponse };
