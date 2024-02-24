import type { RichClientRequest } from "../../Core/rich-client-request.mjs";

import type { RichServerResponse } from "../../Core/rich-server-response.mjs";



interface ExecutionContextInstantiationInterface
{
	request: RichClientRequest;
	response: RichServerResponse;
}

export type { ExecutionContextInstantiationInterface };
