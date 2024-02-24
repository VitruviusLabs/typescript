import type { RichServerResponse } from "../../Core/RichServerResponse.mjs";

import type { RichClientRequest } from "../../Core/rich-client-request.mjs";


interface ExecutionContextInstantiationInterface
{
	request: RichClientRequest;
	response: RichServerResponse;
}

export type { ExecutionContextInstantiationInterface };
