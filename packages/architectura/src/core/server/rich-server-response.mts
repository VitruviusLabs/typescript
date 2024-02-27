import { ServerResponse as HTTPServerResponse } from "node:http";
import { type Gzip, createGzip } from "node:zlib";
import { TypeGuard } from "@vitruvius-labs/ts-predicate";
import type { ExecutionContext } from "../execution-context/execution-context.mjs";
import type { RichClientRequest } from "./rich-client-request.mjs";
import type { Session } from "./session.mjs";
import type { ReplyInterface } from "./definition/interface/reply.interface.mjs";
import type { JSONObjectType } from "../../definition/type/json-object.type.mjs";
import { ExecutionContextRegistry } from "../../core/execution-context/execution-context.registry.mjs";
import { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";

class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private content: Buffer | string | undefined = undefined;

	public constructor(request: RichClientRequest)
	{
		super(request);
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
			this.setHeaders(parameters.headers);
		}

		if (parameters.contentType === undefined)
		{
			const CONTENT_TYPE: string | undefined = this.resolveContentType(parameters);

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

	/**
	 * send
	 */
	public send(): void
	{
		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext();

		const SESSION: Session | undefined = CONTEXT.getSession();

		if (SESSION !== undefined)
		{
			const COOKIES: Map<string, string> = SESSION.getCookies();

			const SET_COOKIE_HEADER: Array<string> = [];

			for (const [COOKIE_NAME, COOKIE_VALUE] of COOKIES)
			{
				SET_COOKIE_HEADER.push(`${COOKIE_NAME}=${COOKIE_VALUE}`);
			}

			this.setHeader("Set-Cookie", SET_COOKIE_HEADER);
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

	/**
	 * areHeadersSent
	 */
	public areHeadersSent(): boolean
	{
		return this.headersSent;
	}

	/**
	 * isDone
	 */
	public isDone(): boolean
	{
		return this.writableEnded;
	}

	/**
	 * isSent
	 */
	public isSent(): boolean
	{
		return this.writableFinished;
	}

	/**
	 * getContent
	 */
	public getContent(): string | undefined
	{
		if (this.content instanceof Buffer)
		{
			return this.content.toString();
		}

		return this.content;
	}

	/**
	 * setContent
	 */
	public setContent(content: Buffer | string): void
	{
		this.content = content;
	}

	/**
	 * getStatusCode
	 */
	public getStatusCode(): HTTPStatusCodeEnum
	{
		return this.statusCode;
	}

	/**
	 * setStatusCode
	 */
	public setStatusCode(status_code: HTTPStatusCodeEnum): void
	{
		this.statusCode = status_code;
	}

	/**
	 * setHeaders
	 */
	public setHeaders(headers: Array<[string, string]> | Headers | Map<string, string> | Record<string, string>): void
	{
		// @ts-expect-error: Map is a valid initializer for Headers
		const HEADERS: Headers = new Headers(headers);

		HEADERS.forEach(
			(value: string, header: string): void =>
			{
				this.setHeader(header, value);
			}
		);
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this -- utility method
	private resolveContentType(parameters: ReplyInterface): string | undefined
	{
		if (parameters.payload === undefined)
		{
			return undefined;
		}

		if (parameters.contentType !== undefined)
		{
			return parameters.contentType;
		}

		if (TypeGuard.isRecord(parameters.payload))
		{
			return ContentTypeEnum.JSON;
		}

		return ContentTypeEnum.TEXT;
	}
}

export { RichServerResponse };
