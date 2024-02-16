
import type { ExecutionContextInstantiationInterface } from "./ExecutionContext/ExecutionContextInstantiationInterface.mjs";

import type { RichClientRequest } from "./RichClientRequest.mjs";


import type { RichServerResponse } from './RichServerResponse.mjs';

import type { Session } from "../Service/Session.mjs";

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
