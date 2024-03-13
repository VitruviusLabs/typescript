import type { RichClientRequest } from "./rich-client-request.mjs";
import type { ReplyInterface } from "./definition/interface/reply.interface.mjs";
import type { JSONObjectType } from "../../definition/type/json-object.type.mjs";
import type { CookieDescriptorInterface } from "./definition/interface/cookie-descriptor.interface.mjs";
import { TLSSocket } from "node:tls";
import { ServerResponse as HTTPServerResponse } from "node:http";
import { type Gzip, createGzip } from "node:zlib";
import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";
import { CookieSameSiteEnum } from "./definition/enum/cookie-same-site.enum.mjs";
import { resolveContentType } from "./utility/resolve-content-type.mjs";

class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private readonly cookies: Map<string, CookieDescriptorInterface>;
	private content: Buffer | string | undefined = undefined;

	public constructor(request: RichClientRequest)
	{
		super(request);

		this.cookies = new Map();
	}

	public json(content: JSONObjectType): void
	{
		this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: JSON.stringify(content),
			contentType: ContentTypeEnum.JSON,
		});
	}

	public text(content: Buffer | string): void
	{
		this.replyWith({
			status: HTTPStatusCodeEnum.OK,
			payload: content,
			contentType: ContentTypeEnum.TEXT,
		});
	}

	public replyWith(parameters: HTTPStatusCodeEnum | ReplyInterface): void
	{
		if (TypeGuard.isNumber(parameters))
		{
			this.statusCode = parameters;
			this.send();

			return;
		}

		this.statusCode = parameters.status ?? HTTPStatusCodeEnum.OK;

		if (parameters.headers !== undefined)
		{
			// @ts-expect-error: Map is a valid initializer for Headers
			const HEADERS: Headers = new Headers(parameters.headers);

			HEADERS.forEach(
				(value: string, header: string): void =>
				{
					this.setHeader(header, value);
				}
			);
		}

		if (parameters.cookies !== undefined)
		{
			parameters.cookies.forEach(
				(descriptor: CookieDescriptorInterface): void =>
				{
					this.setCookie(descriptor);
				}
			);
		}

		if (parameters.contentType === undefined)
		{
			const CONTENT_TYPE: string | undefined = resolveContentType(parameters);

			if (CONTENT_TYPE !== undefined)
			{
				this.setHeader("Content-Type", CONTENT_TYPE);
			}
		}
		else
		{
			this.setHeader("Content-Type", parameters.contentType);
		}

		if (TypeGuard.isRecord(parameters.payload))
		{
			this.content = JSON.stringify(parameters.payload);
		}
		else
		{
			this.content = parameters.payload;
		}

		this.send();
	}

	public send(): void
	{
		if (this.cookies.size > 0)
		{
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

		if (this.content === undefined)
		{
			this.end();

			return;
		}

		this.setHeader("Content-Encoding", "gzip");

		// @TODO: Make response compression great again
		const ENCODER: Gzip = createGzip();

		ENCODER.pipe(this);
		ENCODER.write(this.content);
		ENCODER.end();
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

	public getContent(): string | undefined
	{
		if (this.content instanceof Buffer)
		{
			return this.content.toString();
		}

		return this.content;
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
}

export { RichServerResponse };
