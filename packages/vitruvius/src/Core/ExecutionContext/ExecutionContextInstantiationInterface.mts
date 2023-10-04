import type { ClientRequest } from "../ClientRequest.mjs";

import type { ServerResponse } from "../ServerResponse.mjs";

interface ExecutionContextInstantiationInterface
{
	request: ClientRequest;
	response: ServerResponse<ClientRequest>;
}

export type { ExecutionContextInstantiationInterface };
