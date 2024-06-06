import type { ExecutionContextInstantiationInterface } from "./definition/interface/execution-context-instantiation.interface.mjs";
import type { RichClientRequest } from "../server/rich-client-request.mjs";
import type { RichServerResponse } from "../server/rich-server-response.mjs";
import { randomUUID } from "node:crypto";
import { ContextualStorage } from "../utility/contextual-storage.mjs";

class ExecutionContext extends ContextualStorage
{
	public readonly uuid: string;
	public readonly request: RichClientRequest;
	public readonly response: RichServerResponse;

	public constructor(context_items: ExecutionContextInstantiationInterface)
	{
		super();

		this.uuid = randomUUID();
		this.request = context_items.request;
		this.response = context_items.response;
	}

	public static Create(context_items: ExecutionContextInstantiationInterface): ExecutionContext
	{
		return new ExecutionContext(context_items);
	}

	/**
	 * Returns the UUID of the context.
	 *
	 * @remarks
	 * Allows for identification of the context from anywhere,
	 * making it easier to debug and trace the flow of the request processing.
	 */
	public getUUID(): string
	{
		return this.uuid;
	}

	/**
	 * Returns the request object that was passed to the server.
	 */
	public getRequest(): RichClientRequest
	{
		return this.request;
	}

	/**
	 * Returns the response object that was passed to the server.
	 */
	public getResponse(): RichServerResponse
	{
		return this.response;
	}
}

export { ExecutionContext };
