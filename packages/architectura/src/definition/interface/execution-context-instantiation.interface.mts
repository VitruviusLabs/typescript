import type { RichClientRequest } from "../../Core/RichClientRequest.mjs";

import type { RichServerResponse } from "../../Core/RichServerResponse.mjs";

interface ExecutionContextInstantiationInterface
{
	request: RichClientRequest;
	response: RichServerResponse;
}

export type { ExecutionContextInstantiationInterface };
