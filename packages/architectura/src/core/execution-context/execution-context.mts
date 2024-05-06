import type { ExecutionContextInstantiationInterface } from "./definition/interface/execution-context-instantiation.interface.mjs";
import type { RichClientRequest } from "../server/rich-client-request.mjs";
import type { RichServerResponse } from "../server/rich-server-response.mjs";
import { ContextualStorage } from "../utility/contextual-storage.mjs";

class ExecutionContext extends ContextualStorage
{
	public readonly request: RichClientRequest;
	public readonly response: RichServerResponse;

	public constructor(context_items: ExecutionContextInstantiationInterface)
	{
		super();

		this.request = context_items.request;
		this.response = context_items.response;
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
