import type { ExecutionContextInstantiationInterface } from "./definition/interface/execution-context-instantiation.interface.mjs";
import type { RichClientRequest } from "../server/rich-client-request.mjs";
import type { RichServerResponse } from "../server/rich-server-response.mjs";
import type { Session } from "../../service/session/entity/session.model.mjs";

class ExecutionContext
{
	private readonly request: RichClientRequest;
	private readonly response: RichServerResponse;
	private session: Session | undefined;

	public constructor(context_items: ExecutionContextInstantiationInterface)
	{
		this.request = context_items.request;
		this.response = context_items.response;
		this.session = undefined;
	}

	public getRequest(): RichClientRequest
	{
		return this.request;
	}

	public getResponse(): RichServerResponse
	{
		return this.response;
	}

	public getSession(): Session | undefined
	{
		return this.session;
	}

	public setSession(session: Session): void
	{
		this.session = session;
	}
}

export { ExecutionContext };
