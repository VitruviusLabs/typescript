import type { ExecutionContextInstantiationInterface } from "./ExecutionContext/ExecutionContextInstantiationInterface.mjs";

import type { RichClientRequest } from "./RichClientRequest.mjs";

import type { RichServerResponse } from './RichServerResponse.mjs';

import type { SessionService } from "../service/_index.mjs";


class ExecutionContext
{
	private readonly request: RichClientRequest;
	private readonly response: RichServerResponse;
	private session?: SessionService;

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
	public getSession(): SessionService | undefined
	{
		return this.session;
	}

	/**
	 * setSession
	 */
	public setSession(session: SessionService): void
	{
		this.session = session;
	}
}

export { ExecutionContext };
