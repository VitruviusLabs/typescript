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

class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private readonly cookies: Map<string, CookieDescriptorInterface>;
	private content: Buffer | string | undefined = undefined;

	public constructor(request: RichClientRequest)
	{
		super(request);

		this.cookies = new Map();
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

	public async json(content: unknown): Promise<void>
	{
		await this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: content,
			contentType: ContentTypeEnum.JSON,
		});
	}

	public async text(content: Buffer | string): Promise<void>
	{
		await this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: content,
			contentType: ContentTypeEnum.TEXT,
		});
	}

	public async replyWith(parameters: HTTPStatusCodeEnum | ReplyInterface): Promise<void>
	{
		if (isNumber(parameters))
		{
			this.statusCode = parameters;
			await this.send();

			return;
		}

		this.statusCode = parameters.status ?? HTTPStatusCodeEnum.OK;

		this.processHeaders(parameters);
		this.processCookies(parameters);
		this.processContentType(parameters);
		this.processPayload(parameters);

		await this.send();
	}

	public async send(): Promise<void>
	{
		this.setCookieHeader();
		await this.writePayload();
	}

	public areHeadersSent(): boolean
	{
		return this.headersSent;
	}

	public isDone(): boolean
	{
		return this.writableEnded;
	}

	public isSent(): boolean
	{
		return this.writableFinished;
	}

	public hasContent(): boolean
	{
		return this.content !== undefined;
	}

	public getUnsafeContent(): Buffer | string | undefined
	{
		return this.content;
	}

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

	public getContent(): string
	{
		if (this.content instanceof Buffer)
		{
			return this.content.toString();
		}

		return this.content ?? "";
	}

	public setContent(content: Buffer | string): void
	{
		this.content = content;
	}

	public getStatusCode(): HTTPStatusCodeEnum
	{
		return this.statusCode;
	}

	public setStatusCode(status_code: HTTPStatusCodeEnum): void
	{
		this.statusCode = status_code;
	}

	public getNormalizedHeader(name: string): Array<string>
	{
		const HEADER: Array<string> | number | string | undefined = this.getHeader(name);

		if (HEADER === undefined)
		{
			return [];
		}

		if (Array.isArray(HEADER))
		{
			return HEADER;
		}

		if (typeof HEADER === "number")
		{
			return [HEADER.toString()];
		}

		return [HEADER];
	}

	public setCookie(descriptor: CookieDescriptorInterface): void
	{
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

	private setCookieHeader(): void
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

			return;
		}

		const ENCODING: ContentEncodingEnum | undefined = this.pickEncoding();

		if (ENCODING === undefined)
		{
			this.write(this.content);
			this.end();

			return;
		}

		this.setHeader("Content-Encoding", ENCODING);
		const ENCODER: Transform = RichServerResponse.GetEncoder(ENCODING);

		const PROMISE: Promise<void> = pipeline(ENCODER, this);

		ENCODER.write(this.content);
		ENCODER.end();

		await PROMISE;
	}

	private pickEncoding(): ContentEncodingEnum | undefined
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
