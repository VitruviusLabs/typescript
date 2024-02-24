import { ServerResponse as HTTPServerResponse } from "node:http";

import { type Gzip, createGzip } from "node:zlib";

import { ExecutionContextService } from "../service/execution-context/execution-context.service.mjs";

import { KernelService } from "../service/kernel/kernel.service.mjs";



import type { RichClientRequest } from "./rich-client-request.mjs";

import type { HTTPStatusCodeEnum } from "../definition/enum/http-status-code.enum.mjs";


import type { SessionService } from "../service/_index.mjs";


class RichServerResponse extends HTTPServerResponse<RichClientRequest>
{
	private content: string = "";

	/**
	 * send
	 */
	public send(content?: Buffer | string | undefined): void
	{
		this.setHeader("Content-Encoding", "gzip");

		const CONTEXT: ExecutionContextService = KernelService.GetExecutionContext(ExecutionContextService);

		const SESSION: SessionService | undefined = CONTEXT.getSession();

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
