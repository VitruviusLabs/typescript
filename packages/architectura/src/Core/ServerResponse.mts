import { ServerResponse as HTTPServerResponse } from "node:http";

import { createGzip } from "zlib";

import { ExecutionContext } from "./ExecutionContext.mjs";

import type { HTTPStatusCodeEnum } from "./HTTP/HTTPStatusCodeEnum.mjs";

import type { Session } from "../Service/Session.mjs";

import type { IncomingMessage } from "node:http";

import type { Gzip } from "zlib";

class ServerResponse<T extends IncomingMessage> extends HTTPServerResponse<T>
{
	private content: string = "";

	/**
	 * send
	 */
	public send(content?: Buffer | string | undefined): void
	{
		this.setHeader("Content-Encoding", "gzip");

		const session: Session|undefined = ExecutionContext.GetSession();

		if (session !== undefined) {
			const cookies: Map<string, string> = session.getCookies();

			const cookiesArray: Array<string> = [];

			for (const [cookiesName, cookiesValue] of cookies) {
				cookiesArray.push(`${cookiesName}=${cookiesValue}`);
			}

			this.setHeader("Set-Cookie", cookiesArray);
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

export { ServerResponse };
