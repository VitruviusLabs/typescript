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

	public getUUID(): string
	{
		return this.uuid;
	}

	public getRequest(): RichClientRequest
	{
		return this.request;
	}

	public getResponse(): RichServerResponse
	{
		return this.response;
	}
}

export { ExecutionContext };
