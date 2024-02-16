import { ServerResponse as HTTPServerResponse } from "node:http";

import { type Gzip, createGzip } from "node:zlib";

import { ExecutionContext } from "./ExecutionContext.mjs";

import { Kernel } from "./Kernel.mjs";

import type { HTTPStatusCodeEnum } from "./HTTP/HTTPStatusCodeEnum.mjs";

import type { RichClientRequest } from "./RichClientRequest.mjs";

import type { Session } from "../Service/Session.mjs";

class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private content: string = "";

	/**
	 * send
	 */
	public send(content?: Buffer | string | undefined): void
	{
		this.setHeader("Content-Encoding", "gzip");

		const CONTEXT: ExecutionContext = Kernel.GetExecutionContext(ExecutionContext);

		const SESSION: Session | undefined = CONTEXT.getSession();

		if (SESSION !== undefined)
		{
			const COOKIES: Map<string, string> = SESSION.getCookies();

			const SET_COOKIE_HEADER: Array<string> = [];

			for (const [COOKIE_NAME, COOKIE_VALUE] of COOKIES) {
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
