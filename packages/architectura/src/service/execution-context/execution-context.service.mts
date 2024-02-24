import type { ExecutionContextInstantiationInterface } from "../../Core/ExecutionContext/execution-context-instantiation.interface.mjs";

import type { RichClientRequest } from "../../Core/RichClientRequest.mjs";

import type { RichServerResponse } from '../../Core/RichServerResponse.mjs';

import type { SessionService } from "../_index.mjs";

class ExecutionContextService
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

export { ExecutionContextService };
