import { ServerResponse as HTTPServerResponse } from "node:http";
import { type Gzip, createGzip } from "node:zlib";
import { ExecutionContextRegistry } from "../../core/execution-context/execution-context.registry.mjs";
import { ExecutionContext } from "../execution-context/execution-context.mjs";
import type { HTTPStatusCodeEnum } from "./definition/enum/http-status-code.enum.mjs";
import type { RichClientRequest } from "./rich-client-request.mjs";
import type { Session } from "./session.mjs";
import type { ReplyInterface } from "./definition/interface/reply.interface.mjs";
import type { JSONReplyInterface } from "./definition/interface/json-reply.interface.mjs";
import { ContentTypeEnum } from "./definition/enum/content-type.enum.mjs";

class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private content: string = "";

	public replyWith(parameters: HTTPStatusCodeEnum | ReplyInterface): void
	{
		if (typeof parameters === "number")
		{
			this.statusCode = parameters;
			this.send();

			return;
		}

		const contentType: string = parameters.contentType ?? ContentTypeEnum.TEXT_PLAIN;

		this.setHeader("Content-Type", contentType);

		if (parameters.payload instanceof Buffer)
		{
			this.send(parameters.payload);

			return;
		}

		if (parameters.payload instanceof ReadableStream)
		{
			parameters.payload.pipe(this);

			return;
		}

		if (typeof parameters.payload === "string")
		{
			this.send(parameters.payload);

			return;
		}

		this.send(JSON.stringify(parameters.payload));
	}

	public sendJSON(content: JSONReplyInterface): void
	{
		this.replyWith({
			status: content.status,
			payload: JSON.stringify(content.payload),
			contentType: ContentTypeEnum.APPLICATION_JSON,
		});
	}

	/**
	 * send
	 */
	public send(content?: Buffer | string | undefined): void
	{
		this.setHeader("Content-Encoding", "gzip");

		const CONTEXT: ExecutionContext = ExecutionContextRegistry.GetExecutionContext(ExecutionContext);

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

		// @TODO: Make response compression great again
		const ENCODER: Gzip = createGzip();

		ENCODER.pipe(this);
		ENCODER.write(content ?? this.content);
		ENCODER.end();
	}

	/**
	 * getContent
	 */
	public getContent(): string
	{
		return this.content;
	}

	/**
	 * setContent
	 */
	public setContent(content: string): void
	{
		this.content = content;
	}

	/**
	 * setStatusCode
	 */
	public setStatusCode(status_code: HTTPStatusCodeEnum): void
	{
		this.statusCode = status_code;
	}
}

export { RichServerResponse };
