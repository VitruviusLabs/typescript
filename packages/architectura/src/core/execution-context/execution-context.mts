import type { ExecutionContextInstantiationInterface } from "./definition/interface/execution-context-instantiation.interface.mjs";

import type { RichClientRequest } from "../server/rich-client-request.mjs";

import type { RichServerResponse } from "../server/rich-server-response.mjs";

import type { Session } from "../server/session.mjs";


class ExecutionContext
{
	private readonly request: RichClientRequest;
	private readonly response: RichServerResponse;
	private session?: Session;

	public constructor(context_items: ExecutionContextInstantiationInterface)
	{
		this.request = context_items.request;
		this.response = context_items.response;
	}

	/**
	 * getRequest
	 */
	public getRequest(): RichClientRequest
	{
		return this.request;
	}

	/**
	 * getResponse
	 */
	public getResponse(): RichServerResponse
	{
		return this.response;
	}

	/**
	 * getSession
	 */
	public getSession(): Session | undefined
	{
		return this.session;
	}

	/**
	 * setSession
	 */
	public setSession(session: Session): void
	{
		this.session = session;
	}
}

export { ExecutionContext };
