import { Kernel } from "./Kernel.mjs";

import type { ExecutionContextInstantiationInterface } from "./ExecutionContext/ExecutionContextInstantiationInterface.mjs";

import type { ServerResponse } from './ServerResponse.mjs';

import type { Session } from "../Service/Session.mjs";

class ExecutionContext
{
	// private readonly request: Request;
	private readonly response: ServerResponse;
	private session?: Session;

	private constructor(value: ExecutionContextInstantiationInterface)
	{
		// this.request = value.request;
		this.response = value.response;
	}

	public static Create(value: ExecutionContextInstantiationInterface): ExecutionContext
	{
		return new ExecutionContext(value);
	}

	// public static GetRequest(): Request|undefined
	// {
	// 	return Kernel.GetExecutionContext()?.getRequest();
	// }

	public static GetResponse(): ServerResponse|undefined
	{
		return Kernel.GetExecutionContext()?.getResponse();
	}

	public static GetSession(): Session|undefined
	{
		return Kernel.GetExecutionContext()?.getSession();
	}

	public static SetSession(session: Session): void
	{
		const EXECUTION_CONTEXT: ExecutionContext|undefined = Kernel.GetExecutionContext();

		if (EXECUTION_CONTEXT === undefined)
		{
			return;
		}

		EXECUTION_CONTEXT.setSession(session);
	}

	// public getRequest(): Request
	// {
	// 	return this.request;
	// }

	public getResponse(): ServerResponse
	{
		return this.response;
	}

	/**
	 * setSession
	 */
	public setSession(session: Session): void
	{
		this.session = session;
	}

	/**
	 * getSession
	 */
	public getSession(): Session|undefined
	{
		return this.session;
	}
}

export { ExecutionContext };
